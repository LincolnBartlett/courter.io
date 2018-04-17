import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./Chat";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchAllUsers();
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Header/>
              <br/>
              <Route exact path="/" component={Landing}/>
              <Route path="/chat" component={Chat}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
