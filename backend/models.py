from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(15), nullable=False)
    last_name = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(32), nullable=False)
    locations = db.Column(db.String(1000), nullable=False)
    articles = db.Column(db.String(1000), nullable=False)
    categories = db.Column(db.String(1000), nullable=False)
    isValidated = db.Column(db.Boolean, nullable=False)


    def __repr__(self):
            return self.first_name + " " + self.last_name + " " + self.email + " " + self.password

    def __init__(self, first_name=None, last_name=None, email=None, password=None, locations='', articles='', categories='', isValidated=False):
        
            self.first_name = first_name
            self.last_name = last_name
            self.email = email
            self.password = password
            self.locations = locations
            self.articles = articles
            self.categories = categories
            self.isValidated = isValidated

    def editPreferences(self, locations='', articles='', categories=''): 


        location_array = self.locations.split(',')
        print(location_array)

        article_array = self.articles.split(',')

        self.locations = ''
        for location in locations:

            if location not in location_array:

                self.locations += location
                self.locations += ","

        for article in articles:

            if article not in article_array:

                self.articles += article
                self.articles += ","

        for category in categories:
            self.categories += category 
            self.categories += ","


    def parsePreferences(self, preference):

        preference_array = preference.split(',')
        preference_array.pop()

        return preference_array
