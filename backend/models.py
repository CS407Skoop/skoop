Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(15), nullable=False)
    last_name = Column(String(15), nullable=False)
    email = Column(String(50), nullable=False)
    password = Column(String(32), nullable=False)
    country = Column(String(50), nullable=True)

    '''
    Add another column for preferences. Figure out how to store it.
    '''

    errors = []
    def __repr__(self):
            return self.first_name + " " + self.last_name + " " + self.email + " " + self.password

    def __init__(self, first_name=None, last_name=None, email=None, password=None, country=None):
        self.errors = []

        if(first_name and re.match('^[a-zA-Z]+$', first_name)):
            self.first_name = first_name
        else:
            self.first_name = None
            self.errors.append("Invalid first name formatting")

        if(last_name and re.match('^[a-zA-Z]+$', last_name)):
            self.last_name = last_name
        else:
            self.last_name = None
            self.errors.append("Invalid last name formatting")

        if(email and re.match("([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`""{|}~-]+)*(@|\sat\s)(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(\.|""\sdot\s))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)",email )):
            self.email = email
        else:
            self.email = None
            self.errors.append("Invalid email formatting")

        if(password):
            '''
            Add encryption before saving password in future
            '''

            self.password = password
        else:
            self.password = None
            self.errors.append("Invalid password formatting")

        if(phone and re.match("^[0-9]{10}$", phone)):
            self.phone = phone
        else:
            self.phone = None
            self.errors.append("Invalid phone formatting")

        self.country = country
