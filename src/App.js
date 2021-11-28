import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';

function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
      <Route path="/Home" component={Home}>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
