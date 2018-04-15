import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./Chat";
import Header from "./Header";
import ChatList from "./ChatList";
import UserList from "./UserList";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchAllUsers();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Header/>
              <br/>
              <Route exact path="/" component={Landing}/>
              <Route path="/chat/" component={Chat}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
