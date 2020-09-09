import flask
from flask.blueprints import Blueprint

from utils.db import mysql

korisnik_blueprint = Blueprint("korisnik_blueprint", __name__)

@korisnik_blueprint.route("/korisnik", methods=["GET"])
def dobavi_korisnike():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE aktivan > 0")
    korisnici = cursor.fetchall()
    return flask.jsonify(korisnici)

@korisnik_blueprint.route("/korisnik/<int:id_korisnika>")
def dobavi_korisnika(id_korisnika, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (id_korisnika,))
    korisnik = cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)
    else:
        return "", 404

@korisnik_blueprint.route("/korisnik", methods=["POST"])
def dodaj_korisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    print(flask.request.json)
    cursor.execute("INSERT INTO korisnik(korisnicko_ime, lozinka, ime, prezime, aktivan, admin) VALUES(%(korisnicko_ime)s, %(lozinka)s, %(ime)s, %(prezime)s, %(aktivan)s, %(admin)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201

@korisnik_blueprint.route("/korisnik/<int:id_korisnika>", methods=["PUT"])
def izmeni_korisnika(id_korisnika):
    if flask.session.get("korisnik") is None:
        return "", 403
    db = mysql.get_db()
    cursor = db.cursor()
    data = flask.request.json
    data["id"] = id_korisnika
    cursor.execute("UPDATE korisnik SET korisnicko_ime=%(korisnicko_ime)s, lozinka=%(lozinka)s, ime=%(ime)s, prezime=%(prezime)s WHERE id=%(id)s", data)
    db.commit()
    return "", 200

@korisnik_blueprint.route("/korisnik/<int:id_korisnika>", methods=["DELETE"])
def ukloni_korisnika(id_korisnika):
    if flask.session.get("korisnik") is None:
        return "", 403
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET aktivan=0 WHERE id=%s", (id_korisnika,))
    db.commit()
    return "", 204