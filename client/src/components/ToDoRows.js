import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';

export class TodoRows extends Component {
    removeTodo = (item) => this.props.deleteTodoItemCallback(item);
    editTodo = (item) => this.props.showEditModalCallback(item);

    render = () => (
          <tr>
            <td>{this.props.item.title}</td>
            <td>
              <input
                type="checkbox"
                checked={this.props.item.completed}
                onChange={() => this.props.toggleDoneCallback(this.props.item)}
              />
            </td>
            <td>
                <Button variant="danger" size='sm' onClick={() => {this.removeTodo(this.props.item)}}>
                    Delete
                </Button>
            </td>
            <td>
                <Button variant="info" size='sm' onClick={() => {this.editTodo(this.props.item)}}>
                    Edit
                </Button>
            </td>
          </tr>
    );

}