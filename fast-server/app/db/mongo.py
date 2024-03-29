import os
from pymongo import MongoClient
from pymongo.database import Database

class MongoDB:
    def __init__(self, db_uri: str, db_name: str):
        self.client = MongoClient(db_uri)
        self.db: Database = self.client[db_name]

    def get_database(self) -> Database:
        return self.db

    def close_connection(self):
        self.client.close()
    def test_connection(self):
        try:
            print(self.client.server_info())  # Try to get server info
        except Exception as e:
            print("Connection to MongoDB Atlas failed:", e)

# Example usage:
db_uri = "mongodb+srv://dev:5q0jmmtS643s7lrw@cluster0.ngou7zw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo = MongoDB(db_uri=db_uri, db_name="Cluster0")
mongo.test_connection()
