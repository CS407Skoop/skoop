from flask import Flask, request, url_for
from flask_json import FlaskJSON, JsonError, json_response, as_json
import json
from flask import Response
from app import app
from models import User
from app import db

FlaskJSON(app)

@app.route('/', methods=['GET', 'POST'])
def home():
    print(request.get_json())
    return 'HOME'

@app.route('/api/login/')
def login():
    return 'LOGIN'
    '''
    data = {
        'LOGIN'  : '1',
        'message' : 'SUCCESS',
        'prefences' : 'New York, Chicago, Boston`'

    }
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    return resp
    '''

@app.route('/api/signup/', methods=['GET', 'POST'])
def signup():

    data = request.get_json()

    firstName = data['firstName']
    lastName = data['lastName']
    username = data['username']
    password = data['password']

    user = User(firstName, lastName, username, password)
    db.session.add(user)
    db.session.commit()


    ret = {
        'message' : 'SUCCESS',
        'firstName': firstName,
        'lastName' : lastName

    }
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    return resp
    
