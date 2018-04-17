import React, { Component } from "react";
import { connect } from "react-redux";
import { startChat } from "../actions/index";
import { bindActionCreators } from "redux";

class UserList extends Component {
  renderUsers() {
    switch (this.props.users) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <div>
            {this.props.users.map(user => {
              switch (this.props.auth) {
                case null:
                  return<div/>;
                default:
                  if (user._id === this.props.auth._id) {
                    return<div/>;
                  }
              }
              return (
                <a
                  key={user._id}
                  className="list-group-item list-group-item-action"
                  onClick={() =>
                    this.props.startChat(this.props.auth._id, user._id)
                  }
                >
                  {user.givenName}
                </a>
              );
            })}
          </div>
        );
    }
  }

  render() {
    return (
        <div className="card">
          <div className="card-body">
            <h5>User List:</h5>
            <hr />
            <div className="list-group">{this.renderUsers()}</div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startChat: startChat }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
