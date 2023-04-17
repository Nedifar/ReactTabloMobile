import './App.scss';
import MainPageContainer from './components/MainPageContainer/MainPageContainer';
import React from 'react';

class App extends React.Component {
  render() {

    const url : string = process.env.REACT_APP_API_LOCAL || window.location.origin + '/infotabloserver';

    return (
      <div className='App'>
        <MainPageContainer url={url} />
      </div>
    );
  }
}

export default App;
