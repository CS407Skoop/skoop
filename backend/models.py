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
        category_array = self.categories.split(',')

        self.locations = ''
        self.categories = ''
        for location in locations:

            if location not in self.locations:

                self.locations += location
                self.locations += ","

        for article in articles:

            if article not in self.articles:

                self.articles += article
                self.articles += ","

        for category in categories:

            if category is not None :
                if category not in self.categories:
                    self.categories += category
                    self.categories += ","


    def parsePreferences(self, preference):

        preference_array = preference.split(',')
        preference_array.pop()

        return preference_array

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(25), nullable=True)
    description = db.Column(db.String(750), nullable=True)
    publisher = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=True)
    latitute = db.Column(db.Float, nullable=False)
    longitute = db.Column(db.Float, nullable=False)
    img_url = db.Column(db.String(500), nullable=True)
    img_height = db.Column(db.Integer, nullable=True)
    img_width = db.Column(db.Integer, nullable=True)

    def __repr__(self):
            return self.id + " " + self.url + " " + self.title

    def __init__(self, id=None, url=None, title=None, city=None, category=None, description=None,
                 publisher=None, country=None, latitude=None, longitude=None, img_url=None,
                 img_height=None, img_width=None):
        
        self.id = id
        self.url = url
        self.title = title
        self.city = city
        self.category = category
        self.description = description
        self.publisher = publisher
        self.country = country
        self.latitude = latitude
        self.longitute = longitute
        self.img_url = img_url
        self.img_height = img_height
        self.img_width = img_width