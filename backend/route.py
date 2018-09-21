from flask import Flask
from flask_json import FlaskJSON, JsonError, json_response, as_json
import json
from flask import Response

app = Flask(__name__)
FlaskJSON(app)

@app.route('/')
def home():
    return 'HOME'

@app.route('/api/login/')
def login():
    data = {
        'LOGIN'  : '1',
        'message' : 'SUCCESS',
        'prefences' : 'New York, Chicago, Boston`'

    }
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    return resp

@app.route('/api/signup/')
def signup():
    data = {
        'SIGNUP'  : '1',
        'message' : 'SUCCESS',
        'prefences' : 'New York, Chicago, Boston`'

    }
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    return resp
