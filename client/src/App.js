import React, {Component} from 'react';
//Importa componentes
import { Navbar } from './components/Navbar';
import { TodoList } from './components/ToDoList';


export default class App extends Component {

  render = () => (
    <div className="container">
      <div className="row">
        <Navbar />
        <TodoList />
      </div>
    </div>
  );
}