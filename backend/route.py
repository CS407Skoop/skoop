from flask import Flask, request, url_for
from flask_cors import CORS, cross_origin
from flask_json import FlaskJSON, JsonError, json_response, as_json
import json
from flask import Response
from app import app
from models import User, Timeline, Article
from app import db
import validation
import dbupdate

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
        articleTitles = []
        articleLinks = []
        articlesIDs = []

        for artID in user.parsePreferences(user.articles):
            tempArt = Article.query.filter_by(id=artID).first()
            if tempArt is not None:
                articleTitles.append(tempArt.title)
                articleLinks.append(tempArt.url)
                articlesIDs.append(tempArt.id)

        ret = {
            'message': 'SUCCESS',
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': username,
            'favoriteLocations': user.parsePreferences(user.locations),
            'favoriteArticleIDs': articlesIDs,
            'favoriteArticleTitles': articleTitles,
            'favoriteArticleLinks': articleLinks,
            'categories': user.parsePreferences(user.categories),
            'blockedCategories': user.parsePreferences(user.blockedCategories)

        }

        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp

@app.route('/api/signup/', methods=['GET', 'POST'])
@cross_origin()
def signup():
    data = request.get_json()

    print(data)
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
            'locations' : '',
            'blockedCategories' : '' 
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
    blockedCategories = ''

    if data.get('blockedCategories'):
        blockedCategories = data['blockedCategories']

    user = User.query.filter_by(email=username, password=password).first()

    if user is None :
        ret = {
            'message': 'Invalid credentials'
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp

    else :
        user.editPreferences(locations, articles, categories, blockedCategories)
        print(locations)
        db.session.commit()
        ret = {
            'message': 'SUCCESS',
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': username,
            'favoriteLocations': user.parsePreferences(user.locations),
            'favoriteArticles': user.parsePreferences(user.articles),
            'categories': user.parsePreferences(user.categories),
            'blockedCategories' : user.parsePreferences(user.blockedCategories)
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
        ret = "<html><body><center>Successfully credentials</center></body></html>"
        #ret = {
        #    'message' : 'Successfully credentials'
        #}
        #js = json.dumps(ret)
        #resp = Response(js, status=200, mimetype='application/json')
        return ret


@app.route('/api/getArticles/', methods=['GET', 'POST'])
@cross_origin()
def getArticles():

    print("in articles")
    data = request.get_json()
    date = data['date']
    toggle = data['toggle']
    username = data['username']
    js = dbupdate.getTimeLineArticles(date, toggle, username)
    resp = Response(js, status=200, mimetype='application/json')
    return resp


@app.route('/api/search/', methods=['GET', 'POST'])
@cross_origin()
def search():

    data = request.get_json()
    flag = data['new']
    search_string = data['search_string']
    if flag == 1:
        js = dbupdate.searchArticles(search_string, True)
    else:
        js = dbupdate.searchArticles(search_string, False)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

@app.route('/api/likeArticle/', methods=['GET', 'POST'])
@cross_origin()
def modifyArticleLike():

    data = request.get_json()

    username = data['username']
    articleID = str(data['id'])

    user = User.query.filter_by(email=username).first()

    if user is None :
        ret = {
            'message': 'Invalid credentials'
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        return resp

    else :

        article_array = user.parsePreferences(user.articles)

        #print(articleID)
        #print(article_array)
        #print(articleID in article_array)

        if articleID not in article_array:
            str(article_array.append(articleID))

        else :
            article_array.remove(articleID)

        user.articles = ','.join(article_array)
        if len(article_array) is not 0:
            user.articles += ","
        db.session.commit()

        articleTitles = []
        articleLinks = []
        articlesIDs = []

        for artID in article_array:
            tempArt = Article.query.filter_by(id=artID).first()
            if tempArt is not None:
                articleTitles.append(tempArt.title)
                articleLinks.append(tempArt.url)
                articlesIDs.append(tempArt.id)

        ret = {
            'favoriteArticleIDs': articlesIDs,
            'favoriteArticleTitles': articleTitles,
            'favoriteArticleLinks': articleLinks
        }
        js = json.dumps(ret)
        resp = Response(js, status=200, mimetype='application/json')
        print(article_array)
        return resp


@app.route('/api/getLocation/', methods=['GET', 'POST'])
@cross_origin()
def getLocation():

    data = request.get_json()
    country = data['country']

    js = dbupdate.getCountryLocation(country)
    resp = Response(js, status=200, mimetype='application/json')
    return resp