import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./Chat";
import Header from "./Header";
import login from "./login";
import ChatList from "./ChatList";
import UserList from "./UserList";
import { connect } from "react-redux";
import * as actions from "../actions";

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
            <Header />
            <br />
            <div className="container">
              <div className="row">
                <Route exact path="/" component={login} />
                <Route path="/chat/" component={Chat} />
                <ChatList />
                <UserList />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
