import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { TodoRows } from './ToDoRows';

export class TodoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            todoItems : [
                {action: 'Task Example N1' , done: false},
                {action: 'Task Example N2', done: true},
            ],
            newTodo : '',
            toggleModal : false,
        }
    }

    handleShowModal  = () => this.setState({toggleModal : true});
    handleCloseModal = () => this.setState({toggleModal : false});

    toggleDone = (todo) =>
        this.setState({
        //Cambia el estado todoItems actualizandolo cuando se presiona el checkbox
        todoItems: this.state.todoItems.map((item) =>
            item.action === todo.action ? { ...item, done: !item.done} :item 
        ), //Si el item actual en la iteración es el que recibo por parámetro, entonces cambio el estado del checkbox, sino lo dejo como está 
    });

    todoRows = () =>
    this.state.todoItems.map((item) =>(
      <TodoRows key={item.action} item={item} callback={this.toggleDone}/>
    ));

    render = () => (
        <div className="col-12">
            <Button variant="primary" onClick={this.handleShowModal}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={this.state.toggleModal}
                onHide={this.handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
      
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>{this.todoRows()}</tbody>
          </table>
        </div>
    );
}