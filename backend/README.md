
Back-end steps:

1) Create tables. All tables go inside models.py

2) Create a new python file for handling the methods to accessing or modifying
   for each type of table. Example, accountManager.py

3) Create routes. All routes go inside route.py.
   We can use app.route() or app.add_url_rule() to make our API/URL routes to
   individual methods inside files like accountManager.py
