import flask
from flask.blueprints import Blueprint

from utils.db import mysql

autor_blueprint = Blueprint("autor_blueprint", __name__)

@autor_blueprint.route("/autor", methods=["GET"])
def dobavi_autore():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM autor where izbrisan = 0")
    autori = cursor.fetchall()
    return flask.jsonify(autori)

@autor_blueprint.route("/autor/<int:id_autora>")
def dobavi_autora(id_autora, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM autor WHERE id=%s", (id_autora,))
    autor = cursor.fetchone()
    if autor is not None:
        return flask.jsonify(autor)
    else:
        return "", 404

@autor_blueprint.route("/autor", methods=["POST"])
def dodaj_autora():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO autor(ime, prezime, izbrisan) VALUES(%(ime)s, %(prezime)s, %(izbrisan)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201

@autor_blueprint.route("/autor/<int:id_autora>", methods=["PUT"])
def izmeni_autora(id_autora):
    db = mysql.get_db()
    cursor = db.cursor()
    data = flask.request.json
    data["id"] = id_autora
    cursor.execute("UPDATE autor SET ime=%(ime)s, prezime=%(prezime)s WHERE id=%(id)s", data)
    db.commit()
    return "", 200

@autor_blueprint.route("/autor/<int:id_autora>", methods=["DELETE"])
def ukloni_autora(id_autora):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE autor SET izbrisan=1 WHERE id=%s", (id_autora,))
    db.commit()
    return "", 204