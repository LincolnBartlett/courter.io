import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchOneUser,
  setViewState,
  fetchIceBreakersByUser,
  setAllUserInfo,
  editIceBreaker
} from "../../actions/index";
import { bindActionCreators } from "redux";
import ChatList from "../chat/ChatList";
import "../../style/profile.css";
import Moment from "react-moment";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editstate: false,
      age: 0,
      sex: "",
      location: "",
      preference: "",
      nickname: "",
      IBeditstate: "",
      IBmessage: "",
      IBtitle: "",
      IB_id: ""
    };

    this.onIBEditEnterPress = ev => {
      if (ev.keyCode === 13 && ev.shiftKey === false) {
        this.updateIceBreaker(ev);
      }
    };
  }

  updateIceBreaker(ev) {
    ev.preventDefault();
    const replyData = {
      message: this.state.IBmessage,
      user_id: this.props.auth._id,
      ice_id: this.state.IB_id
    };
    this.props.editIceBreaker(replyData);
    this.setState({ IBeditstate: "" });
  }

  renderOtherUserIceBreakers() {
    switch (this.props.usericebreakers) {
      case null:
        return <div>Null</div>;
      default:
        return (
          <div>
            {this.props.usericebreakers.map(icebreaker => {
              return (
                <div key={icebreaker._id}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h4> {icebreaker.topic.title} </h4>
                        </div>
                        <div className="col">
                          <p className="text-right">
                            <small>
                              Replies: {icebreaker.replies.length}
                              <br />
                              Rejections: {icebreaker.rejections.length}
                              <br />
                              Edits: {icebreaker.edits.length}
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="alert alert-light text-left">
                        <p>
                          {icebreaker.title}
                          {icebreaker.message}
                        </p>
                        <p className="text-left small mb-0">
                          <Moment format="MMM DD, YYYY hh:mma">
                            {icebreaker.timeStamp}
                          </Moment>
                        </p>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
            <br />
          </div>
        );
    }
  }

  renderUserIceBreakers() {
    switch (this.props.usericebreakers) {
      case null:
        return <div>Null</div>;
      default:
        return (
          <div>
            {this.props.usericebreakers.map(icebreaker => {
              return (
                <div key={icebreaker._id}>
                  <div className="card">
                    {this.renderIBEditForm(icebreaker)}
                  </div>
                  <br />
                </div>
              );
            })}
            <br />
          </div>
        );
    }
  }
  renderIBEditForm(icebreaker) {
    switch (this.state.IBeditstate) {
      default:
        return (
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h4> {icebreaker.topic.title} </h4>
                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={() => this.handleIceBreakerEditClick(icebreaker)}
                >
                  Edit
                </button>
              </div>
              <div className="col">
                <p className="text-right">
                  <small>
                    Replies: {icebreaker.replies.length}
                    <br />
                    Rejections: {icebreaker.rejections.length}
                    <br />
                    Edits: {icebreaker.edits.length}
                  </small>
                </p>
              </div>
            </div>
            <div className="alert alert-light text-left">
              <p>
                {icebreaker.title}
                {icebreaker.message}
              </p>
              <p className="text-left small mb-0">
                <Moment format="MMM DD, YYYY hh:mma">
                  {icebreaker.timeStamp}
                </Moment>
              </p>
            </div>
          </div>
        );
      case icebreaker._id:
        return (
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h4> {icebreaker.topic.title} </h4>
              </div>
              <div className="col">
                <p className="text-right">
                  <small>
                    Replies: {icebreaker.replies.length}
                    <br />
                    Rejections: {icebreaker.rejections.length}
                    <br />
                    Edits: {icebreaker.edits.length}
                  </small>
                </p>
              </div>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                value={this.state.IBmessage}
                onKeyDown={this.onIBEditEnterPress}
                onChange={ev => this.setState({ IBmessage: ev.target.value })}
                rows="5"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-info form-control"
              onClick={ev => this.updateIceBreaker(ev)}
            >
              Update
            </button>
          </div>
        );
    }
  }

  handleIceBreakerEditClick(icebreaker) {
    this.setState({
      IBeditstate: icebreaker._id,
      IBmessage: icebreaker.message,
      IB_id: icebreaker._id,
      IBtitle: icebreaker.title
    });
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
      longitude: this.props.geolocation.longitude,
      preference: this.state.preference,
      nickname: this.state.nickname
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
            Preference: {this.props.profileuser.settings.preference}
            <br />
            {this.props.profileuser.location.neighborhood}
          </div>
        );
      default:
        return (
          <div className="card-body">
            <div className="form-group">
              Nickname:
              <input
                className="form-control"
                value={this.state.nickname}
                onChange={ev => this.setState({ nickname: ev.target.value })}
              />
              <br />
              Age:
              <input
                className="form-control"
                value={this.state.age}
                onChange={ev => this.setState({ age: ev.target.value })}
              />
              <br />
              Sex:
              <select
                className="form-control"
                value={this.state.sex}
                onChange={ev => this.setState({ sex: ev.target.value })}
              >
                <option selected>Choose...</option>
                <option>man</option>
                <option>woman</option>
              </select>
              <br />
              Preference:
              <select
                className="form-control"
                value={this.state.preference}
                onChange={ev => this.setState({ preference: ev.target.value })}
              >
                <option selected>Choose...</option>
                <option>man</option>
                <option>woman</option>
                <option>both</option>
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
        this.setState({
          editstate: true,
          sex: this.props.auth.sex,
          age: this.props.auth.age,
          preference: this.props.auth.settings.preference,
          nickname: this.props.auth.nickname
        });
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
                  <div className="card-body">
                    <h4>About {this.props.profileuser.nickname}: </h4>

                    {this.renderUserOptions()}
                    <hr />
                    <button
                      className="btn btn-sm btn-outline-warning float-right"
                      onClick={() => this.handleUserEditButton()}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <br />

                <h1>IceBreakers</h1>
                <hr />
                {this.renderUserIceBreakers()}
              </div>
            );

          case false:
            //PROFILE IS ANOTHER USER
            return (
              <div>
                {this.renderComponentNav()}
                <hr />
                <div className="card">
                  <div className="card-body">
                    <h5>{this.props.profileuser.nickname}</h5>
                    Age: {this.props.profileuser.age}
                    <br />
                    Sex: {this.props.profileuser.sex}
                    <br />
                    {this.props.profileuser.location.neighborhood}
                    <br />
                    <button className="btn btn-sm btn-success">
                      Set Interest
                    </button>
                    <button className="btn btn-sm btn-secondary">GHOST</button>
                  </div>
                </div>
                <br />

                <h1>IceBreakers</h1>
                <hr />
                {this.renderOtherUserIceBreakers()}
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
      setAllUserInfo: setAllUserInfo,
      editIceBreaker: editIceBreaker
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
