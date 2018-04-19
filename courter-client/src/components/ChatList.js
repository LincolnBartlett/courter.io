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
             let name
              return (
                <Link
                  to ={'/chat'}
                  key={chat._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => this.updateChat(chat._id, name)}
                >
                  {chat.recipients.map(recipient => {
                    if (recipient._id !== this.props.auth._id) {
                        name = recipient.givenName;
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
          <div className="card-body">
          <h3>Chat List</h3>
          <hr/>
            <div className="list-group">{this.renderChatList()}</div>
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
