import logo from './logo.svg';
import './App.css';
import Group from './pages/Group/Group'
import { Routes, Route, Link } from 'react-router-dom';
import MainPageContainer from './components/MainPageContainer/MainPageContainer';
import Settings from './pages/Settings/Settings';
import React from 'react';

class App extends React.Component {
  render() {

    const url = 'http://192.168.147.51:81';

    return (
      <div className='App'>
        <MainPageContainer url={url} />
      </div>
    );
  }
}

export default App;
