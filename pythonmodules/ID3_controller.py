import DB as db

db.mycursor.execute("SELECT * FROM diabetes_records")

myresult = db.mycursor.fetchall()

