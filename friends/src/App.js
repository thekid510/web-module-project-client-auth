import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';

import axiosWithAuth from './utils/axiosWithAuth';

function App(props) {
  const logout = () => {
    const token = localStorage.getItem("token")
    axiosWithAuth()
      .post("/api/logout")
      .then(res => {
        localStorage.removeItem("token");
        window.location.href = "/login";
        // this.setState({
        //   isAuth: false
        // })
      })
      .catch(err=>{
        console.log(err);
      })
  };

  const isAuth = localStorage.getItem("token");

  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            {!isAuth ? <Link to="/login">Login</Link> : <div></div>}
          </li>
          <li>
            {isAuth ? <Link to="/protected">Protected Page</Link> : <div></div>}
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
        </ul>

        <Switch>
        <PrivateRoute exact path="/protected"  />
        <Route component={Login} />
        <Route path="/login" component={Login} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
