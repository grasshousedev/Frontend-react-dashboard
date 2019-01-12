import React, { Component } from 'react';
import './App.scss';
import { Header } from './scaffold/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>
          First commit
        </p>
      </div>
    );
  }
}

export default App;
