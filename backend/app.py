from flask import Flask
import psycopg2
import os 

app = Flask(__name__)

@app.route("/api")
def hello():
    conn = psycopg2.connect(database=os.environ['PG_DB'], 
                            user=os.environ['PG_USER'],
                            password=os.environ['PG_SECRET'], 
                            host=os.environ['PG_HOST'], 
                            port=os.environ['PG_PORT'])
    return {"res":"Hello"}

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 4000)