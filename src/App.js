import logo from './logo.svg';
import './App.css';
import Group from './pages/Group/Group'
import {Routes, Route, Link} from 'react-router-dom';
import SharePage from './pages/SharePage/SharePage';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <div className='App'>
      <SharePage/>
    </div>
  );
}

export default App;
