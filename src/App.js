import React, { Component } from 'react';
import './App.scss';
import { Header } from './scaffold/Header/Header';
import { Routes } from 'routes/Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes />
      </div>
    );
  }
}

export default App;
