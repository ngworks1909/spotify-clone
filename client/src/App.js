import './App.css';
import SongBar from './components/SongBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Register';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/'  Component={Home}></Route>
        <Route exact path='/login'  element={
          <Login/>
        }></Route>
        <Route exact path='/signup'  element={
          <Signup/>
        }></Route>
        <Route exact path='/playlist'  Component={SongBar}></Route>
      </Routes>
     </Router>
    </>
  );
}

export default App;
