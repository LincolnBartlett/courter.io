import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchChat,
  setChatData,
  fetchChatList,
  setViewState,
  fetchOneUser
} from "../../actions/index";
import { bindActionCreators } from "redux";
import "../../style/chatList.css";

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatHide: true
    };
  }
  updateChat(data) {
    this.props.fetchChat(data.id);
    this.props.setChatData(data.id, data.nickname, data.user_id);
    this.props.setViewState("chat");
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
        switch (this.state.chatHide) {
          case false:
            return (
              <div className="card-body chatlist-expanded">
                <button
                  className="btn btn-sm btn-outline-primary float-right"
                  onClick={() => {
                    this.setState({ chatHide: true });
                  }}
                >
                  Hide
                </button>
                <h3>Chat List</h3>
                <hr />
                <div className="list-group">
                  {this.props.chatList.map(chat => {
                    let data = {};
                    data.id = chat._id;
                    return (
                      <a
                        key={chat._id}
                        className="list-group-item list-group-item-action"
                        onClick={() => this.updateChat(data)}
                      >
                        {chat.recipients.map(recipient => {
                          if (recipient._id !== this.props.auth._id) {
                            data.nickname = recipient.nickname;
                            data.user_id = recipient._id;
                            return (
                              <div key={chat._id}>{recipient.nickname}</div>
                            );
                          }
                          return null;
                        })}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          default:
            return (
              <div className="card-body">
                <button
                  className="btn btn-outline-primary float-right"
                  onClick={() => {
                    this.setState({ chatHide: false });
                  }}
                >
                  Show
                </button>
                <h3>Chat List</h3>
              </div>
            );
        }
    }
  }

  render() {
    return <div className="card">{this.renderChatList()}</div>;
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
      setChatData: setChatData,
      setViewState: setViewState,
      fetchOneUser: fetchOneUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
