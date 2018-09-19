class accountManager():

    '''
    apiDecorate hasn't been defined yet. But it will be a simple method to convert
    response to JSON format before returning.
    '''
    def login(self):
        ret = {}

        argArray = request.args

        '''
        Add support for POST requests
        '''


        user = models.User(password=argArray.get("password"), email=argArray.get("email"))
        if  not user.email or not user.password:
            ret['errors'] = []
            ret['errors'].append("Invalid email or password received")
            return apiDecorate(ret, 400, "Invalid and/or expired key supplied")

        session = dbConn().get_session(dbConn().get_engine())
        user = session.query(models.User).filter(models.User.email == user.email).filter(models.User.password == user.password).filter(models.User.isEmail == 1).first()

        if user is None:
            ret['errors'] = []
            ret['errors'].append("Incorect User/password combinator or the user is not registered")
            return apiDecorate(ret, 400, "Invalid and/or expired key supplied")
        ret['id'] = user.id

        return apiDecorate(ret, 200, "Login Accepted")
