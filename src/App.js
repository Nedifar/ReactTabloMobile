import logo from './logo.svg';
import './App.css';
import Group from './pages/Group/Group'
import {Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Group/>}/>
      </Routes>
    </div>
  );
}

export default App;
