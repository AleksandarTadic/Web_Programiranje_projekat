import flask
import datetime
from flask import Flask


from utils.db import mysql


from blueprints.login import login_blueprint
from blueprints.korisnik import korisnik_blueprint
from blueprints.autor import autor_blueprint
from blueprints.knjiga import knjiga_blueprint
from blueprints.kupljena_knjiga import kupljena_knjiga_blueprint


app = Flask(__name__, static_url_path="")


app.config["MYSQL_DATABASE_USER"] = "root" 
app.config["MYSQL_DATABASE_PASSWORD"] = "admin" 
app.config["MYSQL_DATABASE_DB"] = "webknjizara" 
app.config["SECRET_KEY"] = "ta WJoir29$"

mysql.init_app(app) 


app.register_blueprint(login_blueprint, url_prefix="/api")
app.register_blueprint(korisnik_blueprint, url_prefix="/api")
app.register_blueprint(autor_blueprint, url_prefix="/api")
app.register_blueprint(knjiga_blueprint, url_prefix="/api")
app.register_blueprint(kupljena_knjiga_blueprint, url_prefix="/api")

@app.route("/")
@app.route("/index")
def index_page():
    return app.send_static_file("index.html")

if __name__ == "__main__":

    app.run("0.0.0.0", 5000, threaded=True, debug=True)
