import React, {Component} from 'react';
//Importa componentes
import { Navbar } from './components/Navbar';
import { TodoRows } from './components/ToDoRows';

export default class App extends Component {

  //El constructor es lo primero que se ejecuta.
  //Único lugar donde puedo modificar el state directamente.
    //En cualquier otro caso: this.setState({ llave: nuevoValor });
  constructor(props){
    super(props);

    this.state = {
      userName: 'Diego B.',
      todoItems: [
        { action: 'Buy Milk', done: false},
        { action: 'Dentist at 5pm', done: false},
        { action: 'Go to gym', done: true},
      ],
      newTodo: '',
    }
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
    })
  }
/* FUNCIÓN MALA
  getLengthRemainingTasks = () => {
    this.state.todoItems.filter( (item) => !item.done ).length;
  }
*/
  render = () => (
    <div className="container">
      <div className="row">

        <Navbar name={this.state.userName} remainingTasks={this.state.remainingTasksLength}/>
        <div className="col-12">
          <input 
            className="form-control" 
            value={this.state.newToDo}
            onChange={this.updateValue}
          />
          <button className="btn btn-primary" onClick={this.newTodo}>
            Add
          </button>
        </div>
        <div className="col-12">
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
      </div>
    </div>
  );
}