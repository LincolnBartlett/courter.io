import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChat, setChatData, fetchChatList } from "../actions/index";
import { bindActionCreators } from "redux";

class Landing extends Component {

  renderLanding() {
    switch (this.props.auth) {
      case null:
        return <div>Null</div>;
      case false:
        return (<div> 
                  <div className="card-body">
                    <h1 className="text-center">Welcome to courter.io</h1>
                    <hr/>
                    <br/>
                    <h2 className="text-center">Conversation is king.</h2>
                    <p> 
                      Unlike most online dating apps we believe in mind over meat. With courter.io you will be matched with people based
                      on your preferences and interests. To start a dialog fill out a few ice breakers so that your potential matches 
                      know how interesting you are, or browse a few to reply to and wow them with your wit.
                    </p>
                    <h5 className="text-center">Because you're a person, not a picture.</h5>
                    <p>
                      Once you've matched with someone you choose how much to share. At any point you can choose to share your real name, your pictures or ghost them for being creepy. 
                      You have full control on who you talk to and how much they know.
                    </p>  
                    <p>
                      It's that simple! But first you'll need to create an account by <a href="/api/auth/google" method="POST">signing in with Google </a>
                    </p>
                  </div>
                </div>);
      default:
        return <div>This will be the home page if a user is signed in</div>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-8 offset-2">
          <div className="card">

              {this.renderLanding()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
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
