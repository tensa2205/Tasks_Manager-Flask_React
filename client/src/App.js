import React, {Component} from 'react';
//Importa componentes
import { Navbar } from './components/Navbar';
import { TodoList } from './components/ToDoList';


export default class App extends Component {

  //Borrar constructor y las cosas raras q le mando al navbar
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


  render = () => (
    <div className="container">
      <div className="row">
        <Navbar name={this.state.userName} remainingTasks={this.state.remainingTasksLength}/>
        <TodoList />
      </div>
    </div>
  );
}