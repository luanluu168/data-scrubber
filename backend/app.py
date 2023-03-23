from flask import Flask, jsonify, request, Response
import psycopg2, os

app = Flask(__name__)

def connectDB():
    try:
        conn = psycopg2.connect(database=os.environ['PG_DB'], 
                                user=os.environ['PG_USER'],
                                password=os.environ['PG_SECRET'], 
                                host=os.environ['PG_HOST'], 
                                port=os.environ['PG_PORT'])
        return conn
    except:
        print("Error: database is not connected")

def queryUser(q):
    conn = connectDB()
    cur = conn.cursor()
    cur.execute(q)
    rows = cur.fetchall()
    conn.commit()
    conn.close()
    return rows

@app.route("/api", methods = ['GET'])
def getUsers():
    return jsonify(queryUser("SELECT * FROM users"))

@app.route("/api/addUsers", methods = ['POST'])
def addUsers():
    data = request.json
    
    return jsonify(queryUser("INSERT INTO users (first_name, last_name, dob, email, age) \
                             VALUES (\'%s\', \'%s\', \'%s\', \'%s\', \'%s\')" \
                             % (data.get('firstName'), data.get('lastName'), data.get('dob'), data.get('email'), data.get('age')) \
                             + ' RETURNING *'))

@app.route("/api/deleteUser", methods = ['POST'])
def deleteUser():
    data = request.json

    return jsonify(queryUser("DELETE FROM users WHERE unique_id = \'%s\'" \
                             % (data.get('unique_id')) \
                             + ' RETURNING *'))

@app.route("/api/updateUser", methods = ['POST'])
def updateUser():
    data = request.json
    
    return jsonify(queryUser("UPDATE users SET first_name = \'%s\', last_name = \'%s\', \
                             dob = \'%s\', email = \'%s\', age = \'%s\' WHERE unique_id = \'%s\'" \
                             % (data.get('firstName'), data.get('lastName'), data.get('dob'), \
                                data.get('email'), data.get('age'), data.get('uniqueId')) \
                             + ' RETURNING *'))

def formatData(data):
    count = 0
    header = ['id', 'first name', 'last name', 'date of birth', 'email', 'age']
    MAX_COL = len(header)

    result = ','.join(header) + "\n"

    for x in data:
        row = ""
        for y in x:
            row += str(y)
            if(count < MAX_COL - 1):
                row += ","
            count = (count + 1) % MAX_COL
        result += row + "\n"

    return result

@app.route("/api/getCSV", methods = ['GET'])
def getCSV():
    data = queryUser("SELECT * FROM users")
    csv = formatData(data)
    return Response(
            csv,
            mimetype="text/csv",
            headers={"Content-disposition":
                    "attachment; filename=result.csv"})

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 5000)