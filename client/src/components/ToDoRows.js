import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';

export class TodoRows extends Component {
    removeTodo = (item) => this.props.deleteTodoItemCallback(item);

    render = () => (
          <tr>
            <td>{this.props.item.action}</td>
            <td>
              <input
                type="checkbox"
                checked={this.props.item.done}
                onChange={() => this.props.toggleDoneCallback(this.props.item)}
              />
            </td>
            <td>
                <Button variant="danger" size='sm' onClick={() => {this.removeTodo(this.props.item)}}>
                    Delete
                </Button>
            </td>
          </tr>
    );

}