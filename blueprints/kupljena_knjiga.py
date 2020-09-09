import flask
from flask.blueprints import Blueprint

from utils.db import mysql

kupljena_knjiga_blueprint = Blueprint("kupljena_knjiga_blueprint", __name__)

@kupljena_knjiga_blueprint.route("/kupljena_knjiga", methods=["GET"])
def dobavi_kupljene_knjige():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupljena_knjiga")
    knjige = cursor.fetchall()
    return flask.jsonify(knjige)

@kupljena_knjiga_blueprint.route("/korisnik_kupljena_knjiga/<int:id_korisnika>")
def dobavi_korisnikove_kupljene_knjige(id_korisnika, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupljena_knjiga WHERE korisnik_id=%s", (id_korisnika,))
    knjiga = cursor.fetchall()
    if knjiga is not None:
        return flask.jsonify(knjiga)
    else:
        return "", 404


@kupljena_knjiga_blueprint.route("/kupljena_knjiga/<int:id_knjige>")
def dobavi_kupljenu_knjigu(id_knjige, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupljena_knjiga WHERE id=%s", (id_knjige,))
    knjiga = cursor.fetchone()
    if knjiga is not None:
        return flask.jsonify(knjiga)
    else:
        return "", 404

@kupljena_knjiga_blueprint.route("/kupljena_knjiga", methods=["POST"])
def dodaj_kupljenu_knjigu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupljena_knjiga(korisnik_id, knjiga_id, datum_kupovine, cena) VALUES(%(korisnik_id)s, %(knjiga_id)s, %(datum_kupovine)s, %(cena)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201
