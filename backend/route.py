from flask import Flask, request, url_for
from flask_cors import CORS, cross_origin
from flask_json import FlaskJSON, JsonError, json_response, as_json
import json
from flask import Response
from app import app
from models import User
from app import db
import validation

FlaskJSON(app)
CORS(app)

@app.route('/api/login/', methods=['GET', 'POST'])
@cross_origin()
def login():
    data = request.get_json()

    username = data['username']
    password = data['password']

    user = User.query.filter_by(email=username, password=password, isValidated=True).first()

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
            'lastName': user.last_name,
            'email': username,
            'favoriteLocations': user.parsePreferences(user.locations),
            'favoriteArticles': user.parsePreferences(user.articles),
            'categories': user.parsePreferences(user.categories)

        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp

@app.route('/api/signup/', methods=['GET', 'POST'])
@cross_origin()
def signup():
    data = request.get_json()

    firstName = data['firstName']
    lastName = data['lastName']
    username = data['username']
    password = data['password']

    user = User.query.filter_by(email=username, password=password).first()
    if user is None:

        user = User(firstName, lastName, username, password)
        db.session.add(user)
        db.session.commit()
        validation.send_validation(username)
        ret = {
            'message': 'SUCCESS',
            'firstName': firstName,
            'lastName': lastName,
            'email': username,
            'categories': '',
            'articles' : '',
            'locations' : ''
        }
    else:
        ret = {
            'message': 'User Already Exists',
            'method': 'signup'
        }
    js = json.dumps(ret)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

@app.route('/api/editPreferences/', methods=['GET', 'POST'])
@cross_origin()
def editPreferences():
    data = request.get_json()

    username = data['username']
    password = data['password']
    articles = data['favoriteArticles']
    locations = data['favoriteLocations']
    categories = data['categories']

    user = User.query.filter_by(email=username, password=password).first()

    if user is None :
        ret = {
            'message': 'Invalid credentials'
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp

    else :
        user.editPreferences(locations, articles, categories)
        print(locations)
        db.session.commit()
        ret = {
            'message': 'SUCCESS',
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': username,
            'favoriteLocations': user.parsePreferences(user.locations),
            'favoriteArticles': user.parsePreferences(user.articles),
            'categories': user.parsePreferences(user.categories)
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp

@app.route('/api/validate/<hash>', methods=['GET', 'POST'])
@cross_origin()
def validate(hash):
    #data = request.get_json()
    #print(hash)
    decoded_output = validation.validate_hash(hash)
    user = User.query.filter_by(email=decoded_output).first()

    print(user)

    if user is None :
        ret = {
            'message': 'Invalid credentials'
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp
    else :
        user.isValidated = True
        print(user)
        print(user.isValidated)
        db.session.commit()
        ret = {
            'message' : 'Successfully credentials'
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp
