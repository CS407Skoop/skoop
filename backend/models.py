from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(15), nullable=False)
    last_name = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(32), nullable=False)

    def __repr__(self):
            return self.first_name + " " + self.last_name + " " + self.email + " " + self.password

    def __init__(self, first_name=None, last_name=None, email=None, password=None, country=None):
        
            self.first_name = first_name
            self.last_name = last_name
            self.email = email
            self.password = password
       
