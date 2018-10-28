from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config.from_pyfile('config.py')
app.config['SQLALCHEMY_POOL_RECYCLE'] = 60
#app.config['SQLALCHEMY_POOL_TIMEOUT'] = 99999

db = SQLAlchemy(app)

from route import *

if __name__ == '__main__':
	port = int(os.environ.get("PORT", 5000))
	app.run(host="0.0.0.0", port=port)
