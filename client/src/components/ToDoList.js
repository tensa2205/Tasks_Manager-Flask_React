import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

import { TodoRows } from './ToDoRows';

export class TodoList extends Component{

    //El constructor es lo primero que se ejecuta.
    //Único lugar donde puedo modificar el state directamente.
            //En cualquier otro caso: this.setState({ llave: nuevoValor });
    constructor(props){
        super(props);

        this.state = {
            todoItems : [
                {id: '1', action: 'Task Example N1' , done: false},
                {id: '2', action: 'Task Example N2', done: true},
            ],
            newTodo : '',
            toggleModal : false,
        }

        //Quisiera saber bién para que funciona esto
        this.deleteTodoItem = this.deleteTodoItem.bind(this);
    }

    //Manejador para cierre-apertura de Modal
    handleShowModal  = () => this.setState({toggleModal : true});
    handleCloseModal = () => this.setState({toggleModal : false});

    //Modifica el valor de newTodo mientras se escribe en el form.
    updateValue = (event) =>{
        this.setState({ newTodo: event.target.value })
    }

    //Agrega un nuevo item a todoItems
    newTodo = () => {

        //Agrega un nuevo item a todoItems
        this.setState({
          todoItems: [
            ...this.state.todoItems,
            {id: uuidv4(), action: this.state.newTodo, done:false},
          ]
        });
        this.handleCloseModal();
      }

    toggleDone = (todo) =>
        this.setState({
        //Cambia el estado todoItems actualizandolo cuando se presiona el checkbox
        todoItems: this.state.todoItems.map((item) =>
            item.id === todo.id ? { ...item, done: !item.done} :item 
        ), //Si el item actual en la iteración es el que recibo por parámetro, entonces cambio el estado del checkbox, sino lo dejo como está 
    });

    deleteTodoItem = (todo) =>
        this.setState({
            todoItems: this.state.todoItems.filter((item) => item.id !== todo.id)
        });

    todoRows = () =>
    this.state.todoItems.map((item) =>(
      <TodoRows key={item.id} item={item} toggleDoneCallback={this.toggleDone} deleteTodoItemCallback={this.deleteTodoItem}/>
    ));

    render = () => (
        <div className="col-12">
            <Button variant="success"  onClick={this.handleShowModal}>
                Create a new task
            </Button>

            <Modal
                show={this.state.toggleModal}
                onHide={this.handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Task creation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTask">
                            <Form.Label>
                                Task name
                            </Form.Label>
                            <Form.Control
                                as='input' 
                                type="text" 
                                placeholder="enter a task name"
                                value={this.state.newTodo}
                                onChange={this.updateValue}
                            />     
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.newTodo}>Save</Button>
                </Modal.Footer>
            </Modal>
      
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Completed</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{this.todoRows()}</tbody>
          </table>
        </div>
    );
}