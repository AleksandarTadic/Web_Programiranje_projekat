import flask
from flask import Blueprint

from utils.db import mysql

login_blueprint = Blueprint("login_blueprint", __name__)

@login_blueprint.route("/login", methods=["POST"])
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE korisnicko_ime=%(korisnicko_ime)s AND lozinka=%(lozinka)s AND aktivan=1", flask.request.json)
    korisnik = cursor.fetchone()
    if korisnik is not None:
        # flask.session["korisnik"] = korisnik["korisnicko_ime"]
        flask.session["korisnik"] = korisnik
        return "", 200
    else:
        return "", 404

@login_blueprint.route("/logout", methods=["GET"])
def logout():
    flask.session.pop("korisnik", None)
    return "", 200

# Funkcija kojom se dobavlja trenutno ulogovani korisnik.
# Moze se prosiriti da dobavi sve podatke korisnik iz baze podataka.
@login_blueprint.route("/currentUser", methods=["GET"])
def current_user():
    return flask.jsonify(flask.session.get("korisnik")), 200
