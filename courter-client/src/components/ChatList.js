import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChat, setChatData, fetchChatList } from "../actions/index";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

class ChatList extends Component {
  updateChat(room, name) {
    this.props.fetchChat(room);
    this.props.setChatData(room, name);
  }

  renderChatList() {
    switch (this.props.chatList) {
      case null:
        if (!this.props.auth) {
          return;
        }
        this.props.fetchChatList(this.props.auth._id);
        return;
      case false:
        return;
      default:
        return (
          <div>
            {this.props.chatList.map(chat => {
              let test;
              return (
                <Link to={'/chat'}
                  key={chat._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => this.updateChat(chat._id, test)}
                >
                  {chat.recipients.map(recipient => {
                    if (recipient._id !== this.props.auth._id) {
                      test = recipient.givenName;
                      return recipient.givenName;
                    }
                    return null;
                  })}
                </Link>
              );
            })}
          </div>
        );
    }
  }

  render() {
    return (
        <div className="card">
          <div className="card-header text-center">
            <h3>Chat List</h3>
          </div >
          <div className="card-body">
            
            <div className="list-group list-group-flush">{this.renderChatList()}</div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    chatList: state.chatList
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
