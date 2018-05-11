import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setViewState,
  fetchOneUser,
  fetchIceBreakersByUser
} from "../actions/index";
import { bindActionCreators } from "redux";
import '../style/header.css';

class Header extends Component {
  handleUserProfileClick() {
    this.props.setViewState("profile");
    this.props.fetchOneUser(this.props.auth._id);
    this.props.fetchIceBreakersByUser(this.props.auth._id);
  }

  handleCourtClick() {
    this.props.setViewState("court");
  }

  renderHeader() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="nav-item">
            <a
              className="nav-link btn btn-outline-secondary"
              href="/api/auth/google"
              method="POST"
            >
              Sign In With Google
            </a>
          </li>
        );
      default:
        return (
          <li className="nav-item">
            <a
              className="nav-link btn btn-outline-secondary"
              href="/api/auth/logout"
            >
              Logout
            </a>
          </li>
        );
    }
  }

  renderCourt() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <li className="nav-item">
            <button
              className="nav-link btn btn-primary"
              onClick={() => this.handleCourtClick()}
            >
              Court
            </button>
          </li>
        );
    }
  }

  renderUser() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <li className="nav-item">
            <a
              className="nav-link btn btn-outline-secondary"
              onClick={() => this.handleUserProfileClick()}
            >
              My Profile
            </a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <small>0.0.1</small>
          <a className="navbar-brand">
            <img className="logo" src="/images/logo_full.png" alt="" />
          </a>
          <ul className="nav justify-content-end">
            {this.renderCourt()}
            {this.renderUser()}
            {this.renderHeader()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setViewState: setViewState,
      fetchOneUser: fetchOneUser,
      fetchIceBreakersByUser: fetchIceBreakersByUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
