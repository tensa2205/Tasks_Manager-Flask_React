import React, {Component} from 'react';

export class Navbar extends Component {
    render = () => (
        <div className="col-12">
          <h2 className="bg-primary text-white text-center">
            To do list: {this.props.remainingTasks}
          </h2>
        </div>
    );
}