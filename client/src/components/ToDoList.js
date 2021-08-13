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
            //Para el modal de creación
            toggleModal : false,
            //Para el modal de edición
            toggleEditModal : false,
            updateTodo : '',
        }

        //Quisiera saber bién para que funciona esto
        this.deleteTodoItem = this.deleteTodoItem.bind(this);
    }

    //Manejador para cierre-apertura de Modal de creación
    handleShowModal  = () => this.setState({toggleModal : true});
    handleCloseModal = () => this.setState({toggleModal : false});

    //Manejador para cierre-apertura de Modal de edición
    handleShowEditModal = (item) => this.setState({updateTodo : item, toggleEditModal : true});
    handleCloseEditModal = () => this.setState({updateTodo: '', toggleEditModal : false});

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
    
    updateTodoItem = () => {
        this.setState({
            todoItems: this.state.todoItems.map( (item) => item.id === this.state.updateTodo.id ? {...item, action: this.state.newTodo} :item),
            newTodo: '',
        });
        this.handleCloseEditModal();
    }

    todoRows = () =>
    this.state.todoItems.map((item) =>(
      <TodoRows key={item.id} item={item} toggleDoneCallback={this.toggleDone} deleteTodoItemCallback={this.deleteTodoItem} showEditModalCallback={this.handleShowEditModal}/>
    ));

    render = () => (
        <div className="col-12">


            {/* Botón que habilita la creación de una nueva tarea -> Modal */}
            <Button variant="success"  onClick={this.handleShowModal}>
                Create a new task
            </Button>

            {/* Modal de creación */}
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

            {/*Modal para modificación */}
            <Modal
                show={this.state.toggleEditModal}
                onHide={this.handleCloseEditModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTask">
                            <Form.Label>
                                New task name
                            </Form.Label>
                            <Form.Control
                                as='input' 
                                type="text" 
                                placeholder={this.state.updateTodo.action}
                                value={this.state.newTodo}
                                onChange={this.updateValue}
                            />     
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseEditModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.updateTodoItem}>Save changes</Button>
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