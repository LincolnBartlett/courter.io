import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import { GeoLocation } from 'react-redux-geolocation';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchAllUsers();
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <GeoLocation/>
        <Landing />
      </div>
    );
  }
}

export default connect(null, actions)(App);
