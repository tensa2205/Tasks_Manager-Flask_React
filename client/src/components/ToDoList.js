import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import { TodoRows } from './ToDoRows';


export class TodoList extends Component{

    //El constructor es lo primero que se ejecuta.
    //Único lugar donde puedo modificar el state directamente.
            //En cualquier otro caso: this.setState({ llave: nuevoValor });
    constructor(props){
        super(props);

        this.state = {
            todoItems : [],
            newTodo : '',
            //Para el modal de creación
            toggleModal : false,
            //Para el modal de edición
            toggleEditModal : false,
            updateTodo : '',

            todoTitle : '',
            updatedCompleted : ''
        }

        //Quisiera saber bién para que funciona esto
        this.deleteTodoItem = this.deleteTodoItem.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
    }

    //Manejador para cierre-apertura de Modal de creación
    handleShowModal  = () => this.setState({toggleModal : true});
    handleCloseModal = () => this.setState({toggleModal : false, newTodo: ''});

    //Manejador para cierre-apertura de Modal de edición
    handleShowEditModal = (item) => this.setState({updateTodo : item, toggleEditModal : true});
    handleCloseEditModal = () => this.setState({updateTodo: '', toggleEditModal : false, newTodo: ''});

    //API REST
    async getItems(){
        try{
            const getResponse = await axios.get('http://localhost:5000/tasks');
            return getResponse;
        } catch(error){
            console.error(error);
        }
    }

    async componentDidMount(){
        let tasksResponse = await this.getItems();
        if (tasksResponse){
            this.setState({
                todoItems: tasksResponse.data,
            })
        }
    }

     async postNewTask(){
         let response = await axios.post('http://localhost:5000/tasks_create', {
            title: this.state.newTodo,
            completed: 0
          });
          return response;
    }

    async deleteTask(idDelete){
        let response = await axios.delete(`http://localhost:5000/tasks/delete/${ idDelete}`);
        return response;
    }

    async updateTask(){
        let response = await axios.put(`http://localhost:5000/tasks/${ this.state.updateTodo.id}`,{
            title: this.state.newTodo,
            completed: this.state.updateTodo.completed
        });
        return response;
    }

    async updateCompleted(idUpdate){
        let response = await axios.put(`http://localhost:5000/tasks_modify_completed/${ idUpdate}`);
        return response;
    }
    //END API REST
    
    
    
    //Modifica el valor de newTodo mientras se escribe en el form.
    updateValue = (event) =>{
        this.setState({ newTodo: event.target.value })
    }


    //Agrega un nuevo item a todoItems
    async newTodo() {
        let responseFromFunction = await this.postNewTask();
        //Agrega un nuevo item a todoItems
        this.setState({
            todoItems: responseFromFunction.data,
            newTodo : ''
        })
        this.handleCloseModal();
        
    }
      
    //Cambia el estado todoItems actualizandolo cuando se presiona el checkbox
    async toggleDone(todo){
        let toggleResponse = await this.updateCompleted(todo.id);
        
        this.setState({
            todoItems: toggleResponse.data
        });
    }



    async deleteTodoItem(todo){
        let responseFromFunction = await this.deleteTask(todo.id);

        this.setState({
            todoItems: responseFromFunction.data
        });
    }
    
    async updateTodoItem(){
        let responseFromFunction = await this.updateTask();

        this.setState({
            todoItems: responseFromFunction.data
        })
        
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
                    <Button variant="primary" onClick={() => {this.newTodo()}}>Save</Button>
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
                                placeholder={this.state.updateTodo.title}
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
                    <Button variant="primary" onClick={() => {this.updateTodoItem()}}>Save changes</Button>
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