from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow, fields

app = Flask(__name__)

#Configuración MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/flaskSQL'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = SQLAlchemy(app)
ma = Marshmallow(app)

class ToDoItem(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(90), unique=True)

    def __init__(self, title):
        self.title = title 

#Creación de tablas
db.create_all()

#Schema de interacción
class ToDoItemSchema(ma.Schema):
    #title = fields.String()
    class Meta:
        fields = ('id', 'title')

#Variables de Schema
toDoItem_schema = ToDoItemSchema()
toDoItems_schema = ToDoItemSchema(many=True)

#Rutas
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'Message' : 'Hi, welcome to my API'
    })

@app.route('/tasks', methods=['POST'])
def create_todoItem():
    #request.json devuelve los datos que envia el cliente.
    title = request.json['title']
    new_toDoItem = ToDoItem(title)
    db.session.add(new_toDoItem)
    db.session.commit()

    return toDoItem_schema.jsonify(new_toDoItem)


@app.route('/tasks', methods=['GET'])
def get_all_toDoItems():
    toDoItems = ToDoItem.query.all()
    return jsonify(toDoItems_schema.dump(toDoItems))

@app.route('/tasks/<id>', methods=['GET'])
def get_toDoItem(id):
    toDoItem = ToDoItem.query.get(id)
    return toDoItem_schema.jsonify(toDoItem)

@app.route('/tasks/<id>', methods=['GET','PUT'])
def update_toDoItem(id):
    toDoItemUpdate = ToDoItem.query.get(id)
    newTitle = request.json['title']

    toDoItemUpdate.title = newTitle

    db.session.commit()

    return toDoItem_schema.jsonify(toDoItemUpdate)

@app.route('/tasks/<id>', methods=['DELETE'])
def delete_toDoItem(id):
    toDoItemDelete = ToDoItem.query.get(id)
    db.session.delete(toDoItemDelete)
    db.session.commit()

    return toDoItem_schema.jsonify(toDoItemDelete)


if __name__ == "__main__":
    app.run(debug=True)