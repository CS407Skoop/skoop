from flask import Flask
from flask_json import FlaskJSON, JsonError, json_response, as_json

app = Flask(__name__)

@app.route('/')
def home():
    return 'HOME'

@app.route('/api/login')
def login():
    return json_response('LOGIN')

@app.route('/api/signup')
def signup():
    return 'SIGNUP'
