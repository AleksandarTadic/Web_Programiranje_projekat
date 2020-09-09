import flask
from flask.blueprints import Blueprint

from utils.db import mysql

knjiga_blueprint = Blueprint("knjiga_blueprint", __name__)

@knjiga_blueprint.route("/knjiga", methods=["GET"])
def dobavi_knjige():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM knjiga WHERE izbrisana = 0")
    knjige = cursor.fetchall()
    return flask.jsonify(knjige)

@knjiga_blueprint.route("/knjiga/<int:id_knjige>")
def dobavi_knjigu(id_knjige, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM knjiga WHERE id=%s", (id_knjige,))
    knjiga = cursor.fetchone()
    print(knjiga)
    if knjiga is not None:
        return flask.jsonify(knjiga)
    else:
        return "", 404

@knjiga_blueprint.route("/knjiga", methods=["POST"])
def dodaj_knjigu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO knjiga(autor_id, naziv, cena, izbrisana, slika, opis) VALUES(%(autor_id)s, %(naziv)s, %(cena)s, %(izbrisana)s, %(slika)s, %(opis)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201

@knjiga_blueprint.route("/knjiga/<int:id_knjige>", methods=["PUT"])
def izmeni_knjigu(id_knjige):
    db = mysql.get_db()
    cursor = db.cursor()
    data = flask.request.json
    data["id"] = id_knjige
    cursor.execute("UPDATE knjiga SET autor_id=%(autor_id)s, naziv=%(naziv)s, cena=%(cena)s, izbrisana=%(izbrisana)s, slika=%(slika)s, opis=%(opis)s WHERE id=%(id)s", data)
    db.commit()
    return "", 200

@knjiga_blueprint.route("/knjiga/<int:id_knjige>", methods=["DELETE"])
def ukloni_korisnika(id_knjige):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE knjiga SET izbrisana=1 WHERE id=%s", (id_knjige,))
    db.commit()
    return "", 204