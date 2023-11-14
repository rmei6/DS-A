import React from 'react';
import ReactDOM from 'react-dom';

class Toggle extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isOpened: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // todo
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const buttonText = this.state.isOpened ? 'ON' : 'OFF';
    return (
      <button onClick={this.handleClick}>{buttonText}</button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);