import React, {Component} from 'react';
import './App.css';
import Board from './components/Board'

class App extends Component {
  constructor(props) {
    super(props);
    this.titleStyle = styles.titleStyle
  }

  render() {
    return (<div className="App">
      <p style={this.titleStyle}>Connect Four</p>
      <Board/>

    </div>);
  }

}

const styles = {
  titleStyle: {
    fontFamily: 'Arial',
    color: '#FFFFF0',
    fontFamily: 'Pacifico, cursive',
    fontWeight: 400,
    fontSize: 40,

  }
};

export default App;
