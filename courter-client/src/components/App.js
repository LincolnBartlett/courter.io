import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
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
              <Route path="/" component={Landing}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
