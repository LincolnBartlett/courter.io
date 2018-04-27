import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchOneUser,
  setViewState,
  fetchIceBreakersByUser,
  setAllUserInfo
} from "../../actions/index";
import { bindActionCreators } from "redux";
import ChatList from "../chat/ChatList";
import "../../style/profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editstate: false,
      age: 0,
      sex: "",
      location: ""
    };
  }

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

  renderComponentNav() {
    return (
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
    );
  }

  handleUserInfoSubmit() {
    const infoData = {
      user_id: this.props.auth._id,
      age: this.state.age,
      sex: this.state.sex,
      latitude: this.props.geolocation.latitude,
      longitude: this.props.geolocation.longitude
    };
    this.props.setAllUserInfo(infoData);
    this.setState({ editstate: false });
  }

  renderUserOptions() {
    switch (this.state.editstate) {
      case false:
        return (
          <div className="card-body">
            Age: {this.props.profileuser.age}
            <br />
            Sex: {this.props.profileuser.sex}
            <br />
            {this.props.profileuser.location.neighborhood}
          </div>
        );
      default:
        return (
          <div className="card-body">
            <div className="form-group">
              Age:
              <input
                className="form-control"
                value={this.state.age}
                onChange={ev => this.setState({ age: ev.target.value })}
              />
              <br />
              Sex:            
              <select id="inputState" className="form-control" value={this.state.sex}
                onChange={ev => this.setState({ sex: ev.target.value })}>
                <option selected>Choose...</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <button
                onClick={() => {
                  this.handleUserInfoSubmit();
                }}
                className="btn btn-primary mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        );
    }
  }

  handleUserEditButton() {
    switch (this.state.editstate) {
      case false:
        this.setState({ editstate: true });
        break;
      default:
        this.setState({ editstate: false });
    }
  }

  renderUserProfile() {
    switch (this.props.profileuser) {
      case null:
        return <div>null</div>;
      default:
        switch (this.props.auth._id === this.props.profileuser._id) {
          default:
            //PROFILE IS USER
            return (
              <div>
                {this.renderComponentNav()}
                <hr />
                <div className="card">
                  <div className="card-header text-right">
                    <h1>About {this.props.profileuser.givenName}</h1>
                  </div>
                  {this.renderUserOptions()}
                  <div className="card-footer">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => this.handleUserEditButton()}
                    >
                      Edit
                    </button>
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

          case false:
            //PROFILE IS ANOTHER USER
            return (
              <div>
                {this.renderComponentNav()}
                <hr />
                <div className="card">
                  <div className="card-header text-right">
                    <h1>About {this.props.profileuser.givenName}</h1>
                  </div>
                  <div className="card-body">
                    Age: {this.props.profileuser.age}
                    <br />
                    Sex: {this.props.profileuser.sex}
                    <br />
                    {this.props.profileuser.location.neighborhood}
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-sm btn-success">
                      Set Interest
                    </button>
                    <button className="btn btn-sm btn-secondary">GHOST</button>
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
    usericebreakers: state.usericebreakers,
    geolocation: state.geolocation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchOneUser: fetchOneUser,
      setViewState: setViewState,
      fetchIceBreakersByUser: fetchIceBreakersByUser,
      setAllUserInfo: setAllUserInfo
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
