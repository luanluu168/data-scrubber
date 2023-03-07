from flask import Flask, jsonify
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
def hello():
    return jsonify(queryUser("SELECT * FROM users"))

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 4000)