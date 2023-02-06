import React, { Component, useEffect }  from 'react';
import './App.css';
import Login from "./Components/login"
import { BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom"
import Header from './Components/Header';
import Home from './Components/Home';
import { getUserAuth } from "./actions"
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [])
  return (
    <div className="app">
      {/* <Router>
        <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/home" element={<><Header/><Home/></>}/>
        </Routes>
      </Router> */}
      <Router>
        <Switch>
          <Route exact path= "/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth:() => dispatch(getUserAuth)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
