import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import EventsContainer from "./components/EventsContainer";

// For session to work correctly with backend
axios.defaults.withCredentials = true

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      message: ''
    };

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getMsgFromComponent = this.getMsgFromComponent.bind(this);
    this.endSession = this.endSession.bind(this);
  }


  register(user) {

    var name = user.username;
    var pwd = user.password;

    axios.post('http://localhost:5000/users/register', {
      username: name,
      password: pwd
    })
    .then( (res) => {
        this.setState({
          message: "Register succeeded."
        });
    })
    .catch( (error) => {
      this.setState({
        message: "Couldnt save user: " + error.message
      });
    });
  }


  login(user) {

    var name = user.username;
    var pwd = user.password;

    axios.post('http://localhost:5000/users/login', {
      username: name,
      password: pwd
    })
    .then( (res) => {
        this.setState({
          loggedIn: true,
          message: "Login succeeded."
        });
    })
    .catch( (error) => {
      this.setState({
        message: "Login failed: " + error.message
      });
    });
  }


  endSession() {

    axios.get('http://localhost:5000/users/logout')
    .then( (res) => {
      this.setState({
        loggedIn: false,
        message: "Logout succesful"
      });
    })
    .catch( (error) => {
      this.setState({
        message: "Logout failed: " + error.message
      });
    });
  }


  // This function deals with message from child component EventsContainer
  getMsgFromComponent(msg) {
    this.setState({
      message: msg
    });
  }

  render() {
    return (

      <div>

        <p> {this.state.message ? this.state.message: ''} </p>

        {
          this.state.loggedIn ?

          <div>
            <button onClick={this.endSession}> logout </button>
            <EventsContainer writeMsg={this.getMsgFromComponent} />
          </div>

          :

          <div>
            <RegisterForm register = {this.register} />
            <LoginForm login = {this.login} />
            <hr />
          </div>
        }

      </div>
    );
  }
}

export default App;
