from app import app
from models import User, Article, Timeline
from app import db
import requests
from geotext import GeoText
import certifi
import ssl
import geopy.geocoders
import datetime
import json
import nltk
from nltk.corpus import stopwords
import csv

subscription_key = "ee34cd704dc145e38f456a285dc314d9"
search_url = "https://api.cognitive.microsoft.com/bing/v7.0/news"

headers = {"Ocp-Apim-Subscription-Key" : subscription_key, "pragma": "no-cache"}
params  = {"textDecorations": True, "textFormat": "HTML", "sortBy": "Date"}

ctx = ssl.create_default_context(cafile=certifi.where())
geopy.geocoders.options.default_ssl_context = ctx
gn = geopy.Nominatim(user_agent="BingNewsTest", scheme="http")


def processArticleLocations(news_articles, country):
    i = 0
    numAttempts = 0
    while i < len(news_articles):
        try:
            article_text = requests.get(news_articles[i]["url"]).text
            places = GeoText(article_text)

            cities = []
            #countries = [places.index[2][country.lower()] for country in places.countries]
            countries = [country]
            for city in places.cities:
                if countries.__contains__(places.index[1][city.lower()]):
                    cities.append(city)

            if len(cities) != 0:
                print(i)
                most_prob_city = max(cities, key=cities.count)
                location = gn.geocode(most_prob_city)
                news_articles[i]["city"] = most_prob_city
                news_articles[i]["latitude"] = location.latitude
                news_articles[i]["longitude"] = location.longitude
                news_articles[i]["country"] = country
                numAttempts = 0
        except:
            print("exception")
            if numAttempts < 3:
                i -= 1
                numAttempts += 1
            else:
                numAttempts = 0
        i += 1
    return news_articles

def submitArticles(articles):
    today = datetime.datetime.now().date()
    article_list = Timeline.query.filter_by(articles_date=today).first()
    if article_list is None:
        timeline = Timeline(today)
        db.session.add(timeline)
        db.session.commit()

    for x in articles:
        dup_article = Article.query.filter_by(url=x["url"], title=x["name"]).first()
        if dup_article is None:
            try:
                print(x)
                category = "World"
                img_url = None
                img_height = None
                img_width = None
                try:
                    img_url = x["image"]["thumbnail"]["contentUrl"]
                    img_height=x["image"]["thumbnail"]["height"]
                    img_width=x["image"]["thumbnail"]["width"]
                except KeyError:
                    print("Image not found")

                try:
                    category = x["category"]
                except KeyError:
                    print("Category not found")

                article = Article(url=x["url"], title=x["name"], city=x["city"], category=category,
                              description=x["description"], publisher=x["provider"][0]["name"], country=x["country"],
                              latitude=x["latitude"], longitude=x["longitude"],
                              img_url=img_url, img_height=img_height, img_width=img_width, article_date=today)
                db.session.add(article)
                db.session.commit()
            except KeyError:
                print("Key not found")


def getTimeLineArticles(date, toggle, username):
    if date is not None:
        article_list = Timeline.query.filter_by(articles_date=date).first()
    else:
        article_list = Timeline.query.filter_by()

    list = {}
    list["date"] = date
    list["value"] = []

    locations = []
    posLocations = []
    posCategories = []
    negCategories = []

    user = User.query.filter_by(email=username).first()

    if user is None:
        return list

    if toggle:
        locations = user.parsePreferences(user.locations)
        dic = {}
        with open("wikipedia-iso-country-codes.csv") as f:
            file = csv.DictReader(f, delimiter=',')
            for line in file:
                dic[line['English short name lower case']] = line['Alpha-2 code']
        posLocations = [dic[x] for x in locations]
        posCategories = user.parsePreferences(user.categories)
        negCategories = user.parsePreferences(user.blockedCategories)
    print(locations)
    print(posLocations)
    print(posCategories)
    print(negCategories)


    favArticles = user.parsePreferences(user.articles)
    print(favArticles)


    if date is None:
        if article_list is not None:
            for y in article_list:
                for x in y.articles:
                    if (not toggle) or (x.category in posCategories or x.country in posLocations):
                        if x.category not in negCategories:
                            tempArticle = {"id" : x.id,
                                            "url" : x.url,
                                            "title" : x.title,
                                            "city" : x.city,
                                            "category" : x.category,
                                            "description" : x.description,
                                            "publisher" : x.publisher,
                                            "country" : x.country,
                                            "latitude" : x.latitude,
                                            "longitude" : x.longitude,
                                            "img_url" : x.img_url,
                                            "img_height" : x.img_height,
                                            "img_width" : x.img_width,
                                            "article_date" : str(x.article_date)}
                            if str(x.id) in favArticles:
                                tempArticle["isLiked"] = True
                            else:
                                tempArticle["isLiked"] = False

                            list["value"].append(tempArticle)
    else:
        if article_list is not None:
            for x in article_list.articles:
                if (not toggle) or (x.category in posCategories or x.country in posLocations):
                    if x.category not in negCategories:
                        tempArticle = {"id" : x.id,
                                        "url" : x.url,
                                        "title" : x.title,
                                        "city" : x.city,
                                        "category" : x.category,
                                        "description" : x.description,
                                        "publisher" : x.publisher,
                                        "country" : x.country,
                                        "latitude" : x.latitude,
                                        "longitude" : x.longitude,
                                        "img_url" : x.img_url,
                                        "img_height" : x.img_height,
                                        "img_width" : x.img_width,
                                        "article_date" : str(x.article_date)}

                        if str(x.id) in favArticles:
                            tempArticle["isLiked"] = True
                        else:
                            tempArticle["isLiked"] = False

                        list["value"].append(tempArticle)

    return json.dumps(list)


def getTopByCountry(country):
    params.__setitem__("cc", country)
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    return search_results


def getTopByCategory(category, country=""):
    params.__setitem__("category", category)
    params.__setitem__("cc", country)

    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    #search_results['value'] = processArticleLocations(search_results['value'])
    return search_results


def searchArticles(search_str, new):

    date = str(datetime.datetime.now().date())
    date += " 00:00:00"

    result = {}
    result["value"] = []

    search_list = search_str.split(" ")
    filtered_search = [word.lower() for word in search_list if word not in stopwords.words('english')]

    if new:
        articles = json.loads(getTimeLineArticles(date))
    else:
        articles = json.loads(getTimeLineArticles(None))

    for article in articles["value"]:
        if not new and article["article_date"] == date:
            continue
        if  article["title"] is None:
            continue

        #filtered_description = [word for word in article["description"] if word not in stopwords.words('english')]
        split_title = article["title"].split(" ")
        filtered_title = [word.lower() for word in split_title if word not in stopwords.words('english')]

        #print(article["article_date"])



        flag = False
        for x in filtered_search:
            if x in filtered_title:
                flag = True
                break

        if flag:
            result["value"].append(article)
            print(article["title"])

    return json.dumps(result)


def getCountryLocation(countryCode):
    temploc = gn.geocode(countryCode)
    print(temploc.latitude, temploc.longitude)



#searchArticles("google", False)

#getTimeLineArticles("2018-10-27 00:00:00")

#print(getTimeLineArticles(datetime.datetime.now().date()))

'''
flag = False

if __name__ == "__main__":
    file = open("../documents/countries.txt", "r")
    for line in file:
        print(line)
        country = line.split()[len(line.split()) - 1]
        if country == "GB":
            flag = True
        if flag:
            print("here")
            news_arts = getTopByCountry(country)["value"]
            news_arts = processArticleLocations(news_arts, country)
            try:
                submitArticles(news_arts)
            except Exception as ex:
                print(type(ex), ",", ex.__class__.__name__)


'''

