import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

    //Modifica el valor de newTodo mientras se escribe en el form.
    updateValue = (event) =>{
        this.setState({ newTodo: event.target.value })
    }

    newTodo = () => {

        //Agrega un nuevo item a todoItems
        this.setState({
          todoItems: [
            ...this.state.todoItems,
            { action: this.state.newTodo, done:false},
          ]
        });
        this.handleCloseModal();
      }

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
              </tr>
            </thead>
            <tbody>{this.todoRows()}</tbody>
          </table>
        </div>
    );
}