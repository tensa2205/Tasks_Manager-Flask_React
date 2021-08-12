import React,{Component} from 'react';

export class TodoRows extends Component {
    //Contenido nuevo para empezar a separar en más componentes
    constructor(props){
        super(props);

        this.state = {
            todoItems : [
                {action: 'Test Task', completed: false},
            ],
        }
    }
    //Fin contenido nuevo
    render = () => (
          <tr>
            <td>{this.props.item.action}</td>
            <td>
              <input
                type="checkbox"
                checked={this.props.item.done}
                onChange={() => this.props.callback(this.props.item)}
              />
            </td>
          </tr>
    );

}