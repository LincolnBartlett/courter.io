import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChat, setChatData, fetchChatList } from "../actions/index";
import { bindActionCreators } from "redux";
import Court from "./court/Court";
import Chat from "./chat/Chat";
import ChatList from "./chat/ChatList";
import Profile from "./user/Profile";
import Settings from "./user/Settings";
import Tutorial from "./user/Tutorial";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewState: ""
    };
  }

  mainView() {
    switch (this.props.auth.settings.tutorial) {
      case false:
        return <Tutorial />;
      default:
        switch (this.props.viewState) {
          case "court":
            return <Court />;
          case "chat":
            return <Chat />;
          case "profile":
            return <Profile />;
          case "settings":
            return <Settings />;
          default:
            return <Court />;
        }
    }
  }
  renderLanding() {
    switch (this.props.auth) {
      case null:
        return <div>Loading...</div>;
      case false:
        return (
          <div className="container">
            <div className="col-md-8 offset-2">
              <br />
              <div className="card">
                <div className="card-body">
                  <h3>Welcome to courter.io,</h3>
                  <p>
                    This isn't just another dating app. With courter.io you
                    judge people based on who they are, not what they are. First
                    choose topics you like, then browse icebreakers from your
                    matches. Reply to wow them with your wit or fill out a few
                    to show people how interesting you are.
                  </p>
                  <h5 className="text-center">
                    Because you're a person, not a picture.
                  </h5>
                  <p>
                    Once you've matched with someone you choose how much to
                    share. At any point you can choose to share your real name,
                    your pictures or ghost them for being too creepy. You have
                    full control on who you talk to and how much they know.
                  </p>
                  <p>
                    It's that simple! But first you'll need to create an account
                    by{" "}
                    <a href="/api/auth/google" method="POST">
                      signing in with Google{" "}
                    </a>
                  </p>
                </div>
              </div>

              <br />
              <div className="card">
                <div className="card-body">
                  <p>
                    This project is currently in development and the site is a
                    snapshot of the most recent development build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return this.mainView();
    }
  }
  renderChatList() {
    switch (this.props.auth) {
      case null:
        return <div />;
      case false:
        return <div />;
      default:
        return <ChatList />;
    }
  }
  render() {
    return (
      <div>
        {this.renderLanding()}
          <div className="col-md-4 offset-md-8 fixed-bottom">
            {this.renderChatList()}
          </div>
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    viewState: state.viewState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchChat: fetchChat,
      fetchChatList: fetchChatList,
      setChatData: setChatData
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
