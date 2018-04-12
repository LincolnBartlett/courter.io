import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChat, setChatData, fetchChatList } from '../actions/index';
import { bindActionCreators } from 'redux';

class UserList extends Component {

    updateChat(room) {
        this.props.fetchChat(room);
        this.props.setChatData(room);
    }

    renderChats() {
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
                    <ul>
                        {this.props.chatList.map(chat => {
                            return (
                                <a key={chat._id} className="list-group-item list-group-item-action" onClick={() => this.updateChat(chat._id)}>
                                    {chat.recipients.map(recipient => {
                                        if (recipient._id !== this.props.auth._id) {
                                            return recipient.givenName;
                                        }
                                        return null;
                                    })}
                                </a>);
                        })}
                    </ul>
                );
        }
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="list-group">
                    {this.renderChats()}
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
    return bindActionCreators({ fetchChat: fetchChat, fetchChatList: fetchChatList, setChatData: setChatData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);