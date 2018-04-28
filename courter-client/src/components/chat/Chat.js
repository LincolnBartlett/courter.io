import React, { Component } from "react";
import { connect } from "react-redux";
import * as ReactDOM from "react-dom";
import io from "socket.io-client";
import Moment from "react-moment";
import "../../style/chat.css";
import ChatList from "./ChatList";
import { bindActionCreators } from "redux";
import {
  setViewState,
  fetchOneUser,
  fetchIceBreakersByUser
} from "../../actions/index";

class Chat extends Component {
  //Handle Socket Change on Props Change
  componentWillReceiveProps(nextProps) {
    this.setState({ messages: [] });
    switch (this.props.chatData) {
      case null:
        return;
      default:
        this.socket.emit("room", this.props.chatData.chat_id);
        return;
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: []
    };

    //SOCKET.io
    this.socket = io.connect();
    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            message: data.message,
            user: data.nickname,
            userId: data.user,
            _id: data._id,
            timeStamp: data.timeStamp,
            topic: data.topic
          }
        ]
      });
    };

    this.onEnterPress = ev => {
      if (ev.keyCode === 13 && ev.shiftKey === false) {
        this.sendMessage(ev);
      }
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        message: this.state.message,
        user: this.props.auth._id,
        nickname: this.props.auth.nickname,
        chat: this.props.chatData.chat_id
      });
      this.setState({ message: "" });
    };
  }

  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0;
  };

  handleProfileClick(user_id) {
    this.props.fetchOneUser(user_id);
    this.props.fetchIceBreakersByUser(user_id);
    this.props.setViewState("profile");
  }
  //CHAT WINDOW
  renderComponentNav() {
    return (
      <div className="form-row">
      <div className="col-md-9">
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
    </div>
    );
  }

  renderChat() {
    switch (this.props.chat) {
      case null:
        return (
          <div>
            {this.renderComponentNav()}
            <hr />
            <div className="card">
              <div className="card-body">
                <h3>Select a Chat</h3>

                <hr />
                <div
                  className="container-fluid chat-window-empty"
                  ref="messageList"
                />
              </div>
            </div>
          </div>
        );
      case false:
        return <p>Error</p>;
      default:
        return (
          <div>
            <div className="form-row">
              <div className="col-md-9">
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
            </div>
            <hr />
            <div className="card">
              <div className="card-body">
                <h3>{this.props.chatData.nickname}</h3>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    this.handleProfileClick(this.props.chatData.user_id);
                  }}
                >
                  Profile
                </button>
                <hr />
                <div
                  className="border jumbotron container-fluid chat-window"
                  ref="messageList"
                >
                  {this.renderHistory()}
                  {this.renderSocket()}
                </div>

                {this.renderInput()}
              </div>
            </div>
          </div>
        );
    }
  }

  renderMessageRight(message) {
    if (message.topic) {
      return (
        <div key={message._id} className="float-right text-right  w-75">
          <div className="alert alert-primary">
            <p>{message.topic.title}</p>
            <p>{message.message}</p>
            <p className="text-right small mb-0">
              <Moment format="MMM DD, YYYY hh:mma">{message.timeStamp}</Moment>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div key={message._id} className="float-right text-right  w-75">
        <div className="alert alert-primary">
          <p>{message.message}</p>
          <p className="text-right small mb-0">
            <Moment format="MMM DD, YYYY hh:mma">{message.timeStamp}</Moment>
          </p>
        </div>
      </div>
    );
  }

  renderMessageLeft(message) {
    if (message.topic) {
      return (
        <div key={message._id} className="float-left text-left w-75">
          <div className="alert alert-light">
            <p>{message.topic.title} {message.message}</p>
            <p className="text-left small mb-0">
              <Moment format="MMM DD, YYYY hh:mma">{message.timeStamp}</Moment>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div key={message._id} className="float-left text-left w-75">
        <div className="alert alert-light">
          <p>{message.message}</p>
          <p className="text-left small mb-0">
            <Moment format="MMM DD, YYYY hh:mma">{message.timeStamp}</Moment>
          </p>
        </div>
      </div>
    );
  }

  renderHistory() {
    switch (this.props.chat) {
      case null:
        return;
      case false:
        return <p>Error</p>;
      default:
        return (
          <div>
            {this.props.chat.map(message => {
              if (message.author._id === this.props.auth._id) {
                return this.renderMessageRight(message);
              }
              return this.renderMessageLeft(message);
            })}
          </div>
        );
    }
  }

  renderSocket() {
    return (
      <div>
        {this.state.messages.map(message => {
          if (message.userId === this.props.auth._id) {
            return this.renderMessageRight(message);
          }
          return this.renderMessageLeft(message);
        })}
      </div>
    );
  }

  renderInput() {
    return (
      <form onSubmit={this.sendMessage}>
        <textarea
          type="text"
          className="form-control"
          value={this.state.message}
          onKeyDown={this.onEnterPress}
          onChange={ev => this.setState({ message: ev.target.value })}
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary float-right bump"
        >
          Send
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">{this.renderChat()}</div>
          <div className="col-md-4">
            <ChatList />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { chat: state.chat, auth: state.auth, chatData: state.chatData };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setViewState: setViewState,
      fetchOneUser: fetchOneUser,
      fetchIceBreakersByUser: fetchIceBreakersByUser
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
