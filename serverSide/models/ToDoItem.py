from flask_sqlalchemy import SQLAlchemy
from db_sqlalchemy import db_sqlalchemy

db = db_sqlalchemy

class ToDoItem(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(90), unique=True)
    completed = db.Column(db.Integer)

    
    def updateTitle(self, newTitle, newCompletedStage):
        self.title = newTitle
        self.completed = newCompletedStage

        db.session.commit()

    @classmethod
    def createNewItem(cls, title, completed):
        newToDoItem = cls(title = title, completed = completed)
        db.session.add(newToDoItem)
        db.session.commit()

        return newToDoItem

    @classmethod
    def getAllItems(cls):
        return cls.query.all()

    @classmethod
    def searchItemById(cls,id):
        return cls.query.get(id)
    
    @classmethod
    def deleteItemById(cls, id):
        deletedItem = cls.searchItemById(id)

        db.session.delete(deletedItem)
        db.session.commit()

        return deletedItem