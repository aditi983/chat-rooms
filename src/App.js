import './App.css';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Chat from './Chat';
import React from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';
import Welcome from './Welcome';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className='app_back'>
            <div className='app_body'>
              <Router>
                <Sidebar/>
                <Switch>
                  <Route path = '/rooms/:roomId'>
                    <Chat/>
                  </Route>

                  <Route path='/'>
                    <Welcome/>
                  </Route>

                </Switch>
                
              </Router>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default App;