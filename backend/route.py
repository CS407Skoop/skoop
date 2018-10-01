from flask import Flask, request, url_for
from flask_cors import CORS, cross_origin
from flask_json import FlaskJSON, JsonError, json_response, as_json
import json
from flask import Response
from app import app
from models import User
from app import db

FlaskJSON(app)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def home():
    print(request.get_json())
    return 'HOME'


@app.route('/api/login/', methods=['GET', 'POST'])
@cross_origin()
def login():
    data = request.get_json()

    username = data['username']
    password = data['password']

    User
    user = User.query.filter_by(email=username, password=password).first()

    if user is None :
        ret = {
            'message': 'Failure'
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp
    else :
        ret = {
            'message': 'SUCCESS',
            'firstName': user.first_name,
            'lastName': user.last_name

        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp

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
        'message': 'SUCCESS',
        'firstName': firstName,
        'lastName': lastName

    }
    js = json.dumps(ret)

    resp = Response(js, status=200, mimetype='application/json')
    return resp
