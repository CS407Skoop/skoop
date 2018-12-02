from app import db
import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(15), nullable=False)
    last_name = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(32), nullable=False)
    locations = db.Column(db.String(1000), nullable=False)
    articles = db.Column(db.String(1000), nullable=False)
    categories = db.Column(db.String(1000), nullable=False)
    blockedCategories = db.Column(db.String(1000), nullable=False)
    isValidated = db.Column(db.Boolean, nullable=False)


    def __repr__(self):
            return self.first_name + " " + self.last_name + " " + self.email + " " + self.password

    def __init__(self, first_name=None, last_name=None, email=None, password=None, locations='', articles='', categories='', blockedCategories='', isValidated=False):
        
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.locations = locations
        self.articles = articles
        self.categories = categories
        self.blockedCategories = blockedCategories
        self.isValidated = isValidated

    def editPreferences(self, locations='', articles='', categories='', blockedCategories=''): 

        self.locations = ''
        self.categories = ''
        self.blockedCategories = ''
        for location in locations:

            if location not in self.locations:

                self.locations += location
                self.locations += ","

        for blocked in blockedCategories:

            if blocked not in self.blockedCategories:

                self.blockedCategories += blocked
                self.blockedCategories += ","

        for category in categories:

            if category is not None :
                if category not in self.categories:
                    self.categories += category
                    self.categories += ","


    def parsePreferences(self, preference):

        if (preference == "") :
            return []

        preference_array = preference.split(',')
        preference_array.pop()

        return preference_array

class Timeline(db.Model):
    articles_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now(), primary_key=True)
    articles = db.relationship('Article', backref='timeline')


    def __repr__(self):
        return self.id + self.articles_date

    def __init__(self, articles_date):

        self.articles_date = articles_date

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(500), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(25), nullable=True)
    description = db.Column(db.String(750), nullable=True)
    publisher = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    img_url = db.Column(db.String(500), nullable=True)
    img_height = db.Column(db.Integer, nullable=True)
    img_width = db.Column(db.Integer, nullable=True)
    article_date = db.Column(db.DateTime, db.ForeignKey(Timeline.articles_date), nullable=False)

    def __init__(self, id=None, url=None, title=None, city=None, category=None, description=None,
                 publisher=None, country=None, latitude=None, longitude=None, img_url=None,
                 img_height=None, img_width=None, article_date=datetime.datetime.now()):
        
        self.id = id
        self.url = url
        self.title = title
        self.city = city
        self.category = category
        self.description = description
        self.publisher = publisher
        self.country = country
        self.latitude = latitude
        self.longitude = longitude
        self.img_url = img_url
        self.img_height = img_height
        self.img_width = img_width
        self.article_date = article_date


        
       
