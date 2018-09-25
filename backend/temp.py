from flask import Flask 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/test'
db = SQLAlchemy(app)

class Example(db.Model):
	__tablename__ = 'example'
	id = db.Column('id', db.Integer, primary_key=True)
data = db.Column('data', db.Unicode)

'''
1. Install MySQL on your local machine
2. Install SQLAlchemy
3. Create database using command line
4. Model your tables inside a file called models.py
5. Using command line, run db.create_all() using the db component in models.py


Figure out how files would be structured
Finalize User table in models.py
run db.create_all()
then start handling routes

'''