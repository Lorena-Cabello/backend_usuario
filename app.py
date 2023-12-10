
# Importa las clases Flask, jsonify y request del módulo flask
from flask import Flask, jsonify, request
# Importa la clase CORS del módulo flask_cors
from flask_cors import CORS
# Importa la clase SQLAlchemy del módulo flask_sqlalchemy
from flask_sqlalchemy import SQLAlchemy
# Importa la clase Marshmallow del módulo flask_marshmallow
from flask_marshmallow import Marshmallow


# Crea una instancia de la clase Flask con el nombre de la aplicación
app = Flask(__name__)
# Configura CORS para permitir el acceso desde el frontend al backend
CORS(app)


# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://lorena91:Tom1luna@lorena91.mysql.pythonanywhere-services.com/lorena91$proyecto"
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:Tom1luna@127.0.0.1/proyecto"
# Configura el seguimiento de modificaciones de SQLAlchemy a False para mejorar el rendimiento
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Crea una instancia de la clase SQLAlchemy y la asigna al objeto db para interactuar con la base de datos
db = SQLAlchemy(app)
# Crea una instancia de la clase Marshmallow y la asigna al objeto ma para trabajar con serialización y deserialización de datos
ma = Marshmallow(app)

class Usuario(db.Model):  
    
    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(40))
    nombre = db.Column(db.String(40))
    apellido = db.Column(db.String(40))
    password = db.Column(db.String(12))
    telefono = db.Column(db.Integer)
    
    def __init__(self, correo, nombre, apellido, password, telefono):
        
        self.correo = correo
        self.nombre = nombre
        self.apellido = apellido
        self.password = password
        self.telefono = telefono

with app.app_context():
    db.create_all()
        
class UsuarioSchema(ma.Schema):
    
    class Meta:
        fields = ("id", "correo", "nombre", "apellido", "password", "telefono")

usuario_schema = UsuarioSchema()  # Objeto para serializar/deserializar un producto
usuarios_schema = UsuarioSchema(many=True)  # Objeto para serializar/deserializar múltiples productos

@app.route("/usuarios", methods=["GET"])
def get_Usuarios():
    
    all_usuarios = Usuario.query.all()  
    result = usuarios_schema.dump(all_usuarios)  
    return jsonify(result)  

@app.route("/usuarios/<id>", methods=["GET"])
def get_usuario(id):
    
    
    usuario = Usuario.query.get(id)  
    db.session.delete(usuario)
    db.session.commit()  
    return usuario_schema.jsonify(usuario)  


@app.route("/usuarios/<id>", methods=["DELETE"])
def delete_usuario(id):
   
    usuario = Usuario.query.get(id)  # Obtiene el producto correspondiente al ID recibido
    db.session.delete(usuario)  # Elimina el producto de la sesión de la base de datos
    db.session.commit()  # Guarda los cambios en la base de datos
    return usuario_schema.jsonify(usuario)  # Retorna el JSON del producto eliminado





@app.route("/usuarios", methods=["POST"])  
def create_usuario():
    
    correo = request.json ["correo"]
    nombre = request.json["nombre"]
    apellido = request.json["apellido"]
    password = request.json["password"]
    telefono = request.json["telefono"]   
    
    new_usuario = Usuario(correo, nombre, apellido, password, telefono)  
    
    db.session.add(new_usuario) 
    db.session.commit()  
    return usuario_schema.jsonify(new_usuario) 




@app.route("/usuarios/<id>", methods=["PUT"])
def update_usuario(id):

    usuario = Usuario.query.get(id)
    
    usuario.correo = request.json["correo"]
    usuario.nombre = request.json["nombre"]
    usuario.apellido = request.json["apellido"]
    usuario.password = request.json["password"]
    usuario.telefono = request.json["telefono"]

    db.session.commit()  
    return usuario_schema.jsonify(usuario) 
    
if __name__ == "__main__":
    # Ejecuta el servidor Flask en el puerto 5000 en modo de depuración
    app.run(debug=True, port=5000)
    












    

    
        
        
        
        
        
        
        
        
