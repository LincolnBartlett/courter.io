import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChat, setChatData, fetchChatList } from "../actions/index";
import { bindActionCreators } from "redux";
import Court from "./Court";

class Landing extends Component {

  renderLanding() {
    switch (this.props.auth) {
      case null:
        return <div>Loading...</div>;
      case false:
        return (<div className="container">
                  <div className="col-md-8 offset-2">
                  <br/>
                  <div className="row">
                        <div className="col-3">
                          <img src="/images/crown_large.png" className="img-fluid" alt=""/>
                        </div>
                        <div className="col-6">
                          <h1 className="text-right display-1">courter.io</h1>
                          <h2 className="text-right">conversation is king</h2>
                        </div>
                      </div>
                      <br/>
                    <div className="card">
                    <div className="card-body"> 
                    <h3>Welcome to courter.io,</h3>           
                      <p> 
                        This isn't just another dating app. 
                        With courter.io you judge people based on who they are, not what they are.
                        First choose topics you like, then browse icebreakers from your matches. 
                        Reply to wow them with your wit or fill out a few to show people how interesting you are.
                      </p>
                      <h5 className="text-center">Because you're a person, not a picture.</h5>
                      <p>
                        Once you've matched with someone you choose how much to share. At any point you can choose to share your real name, your pictures or ghost them for being too creepy. 
                        You have full control on who you talk to and how much they know.
                      </p>  
                      <p>
                        It's that simple! But first you'll need to create an account by <a href="/api/auth/google" method="POST">signing in with Google </a>
                      </p>
                    </div>
                    </div>
                  </div>
                </div>);
      default:
        return <Court/>;
    }
  }

  render() {
    return (
      <div>
      {this.renderLanding()}
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
