import './App.css';
import MainPageContainer from './components/MainPageContainer/MainPageContainer';
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
