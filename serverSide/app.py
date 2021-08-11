from flask import Flask, request, jsonify
from flask_marshmallow import Marshmallow, fields
from db_sqlalchemy import db_sqlalchemy
from models.ToDoItem import ToDoItem

app = Flask(__name__)

#Configuración MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/flaskSQL'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db_sqlalchemy.init_app(app)

#Creación de tablas
with app.app_context():
    db_sqlalchemy.create_all()

ma = Marshmallow(app)

#Schema de interacción
class ToDoItemSchema(ma.Schema):
    #title = fields.String()
    class Meta:
        fields = ('id', 'title', 'completed')

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
    title = request.json['title']
    completed = request.json['completed']
    newItem = ToDoItem.createNewItem(title, completed)
    return toDoItem_schema.jsonify(newItem)

@app.route('/tasks', methods=['GET'])
def get_all_toDoItems():
    return jsonify(toDoItems_schema.dump(ToDoItem.getAllItems()))

@app.route('/tasks/<id>', methods=['GET'])
def get_toDoItem(id):
    return toDoItem_schema.jsonify(ToDoItem.searchItemById(id))

@app.route('/tasks/<id>', methods=['GET','PUT'])
def update_toDoItem(id):
    
    toDoItemUpdate = ToDoItem.searchItemById(id)
    newTitle = request.json['title']
    newCompleted = request.json['completed']
    toDoItemUpdate.updateTitle(newTitle, newCompleted)
    return toDoItem_schema.jsonify(toDoItemUpdate)

@app.route('/tasks/<id>', methods=['DELETE'])
def delete_toDoItem(id):
    toDoItemDelete = ToDoItem.deleteItemById(id)
    return toDoItem_schema.jsonify(toDoItemDelete)

if __name__ == "__main__":
    app.run(debug=True)