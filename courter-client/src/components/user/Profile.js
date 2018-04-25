import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchOneUser,
  setViewState,
  fetchIceBreakersByUser
} from "../../actions/index";
import { bindActionCreators } from "redux";
import ChatList from "../chat/ChatList";
import "../../style/profile.css";

class Profile extends Component {
  renderUserIceBreakers() {
    switch (this.props.usericebreakers) {
      case null:
        return <div>Null</div>;
      default:
        return (
          <ul className="list-group">
            {this.props.usericebreakers.map(icebreaker => {
              return (
                <li className="list-group-item" key={icebreaker._id}>
                  {icebreaker.topic.title} {icebreaker.message}
                </li>
              );
            })}
          </ul>
        );
    }
  }
  renderUserProfile() {
    switch (this.props.profileuser) {
      case null:
        return <div>null</div>;
      default:
        return (
          <div>
           
              <div className="form-row">
                <div className="col-md-6">
                  <h2>courter.io</h2>
                </div>
                <div className="col-md-3">
                  <button
                    className="form-control btn btn-outline-primary"
                    onClick={() => this.props.setViewState("court")}
                  >
                    Court
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    className="form-control btn btn-outline-primary"
                    onClick={() => this.props.setViewState("chat")}
                  >
                    Chat
                  </button>
                </div>
              </div>
              <hr />
              <div className="card">
                    <div className="card-header text-right">
                      <h1>About {this.props.profileuser.givenName}</h1>
                    </div>
                    <div className="card-body">
                      Age:
                      <br />
                      Sex:
                      <br />
                      Location:
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-outline-primary">Set</button>
                      <button className="btn btn-outline-primary">Options</button>
                      <button className="btn btn-outline-danger">Here</button>
                    </div>
                  </div>
        
         
                <br />

                  <div className="card">
                    <div className="card-header text-right">
                      <h1>IceBreakers</h1>
                    </div>
                    <div className="card-body ice-breaker-list">
                      {this.renderUserIceBreakers()}
                    </div>
                  </div>
             
         
          </div>
        );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">{this.renderUserProfile()}</div>
          <div className="col-md-4">
            <ChatList />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    chatList: state.chatList,
    chatData: state.chatData,
    profileuser: state.profileuser,
    usericebreakers: state.usericebreakers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchOneUser: fetchOneUser,
      setViewState: setViewState,
      fetchIceBreakersByUser: fetchIceBreakersByUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
