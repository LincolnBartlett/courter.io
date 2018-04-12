import React, { Component } from "react";
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';
import io from "socket.io-client";
import Moment from 'react-moment';
import '../style/court.css';

import { fetchChat } from '../actions/index';
import { bindActionCreators } from 'redux';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: []
        };


        this.socket = io.connect();

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });



        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, { message: data.message, user: data.givenName, userId: data.user, _id: data._id }] });
        };

        this.onEnterPress = (e) => {
            if (e.keyCode === 13 && e.shiftKey === false) {
                this.sendMessage(e);
            }
        }

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                message: this.state.message,
                user: this.props.auth._id,
                givenName: this.props.auth.givenName,
                chat: this.props.chatData
            });
            this.setState({ message: '' });

        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({messages: []});
        this.socket.emit('room', this.props.chatData);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    renderHistory() {
        switch (this.props.chat) {
            case null:
            return <p>Select a Chat...</p>;
            case false:
            return <p>Error</p>;
            default:
                return (
                    <div>
                        {this.props.chat.map(message => {
                            if (message.author._id === this.props.auth._id) {
                                return (
                                    <div key={message._id} className="float-right text-left  w-75">
                                        <div className="alert alert-primary">
                                            <p><b>{message.author.givenName}:</b> {message.message}</p>
                                            <p className="text-right"><Moment format="ddd, hh:mma">{Date.now()}</Moment></p>
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div key={message._id} className="float-left text-left alert alert-secondary w-75">
                                    <p><b>{message.author.givenName}:</b> {message.message}</p>
                                    <p className="text-right"><Moment format="ddd, hh:mma">{Date.now()}</Moment></p>
                                </div>
                            );
                        })}
                    </div>);
        }
    }

    renderSocketMessages(){
        return(
                <div>
                {this.state.messages.map(message => {
                    
                    if(message.userId === this.props.auth._id){
                        return (
                            <div key={message._id} className="float-right text-left  w-75">
                                <div className="alert alert-primary">
                                    <p><b>{message.user}:</b> {message.message}</p>
                                    <p className="text-right"><Moment format="ddd, hh:mma">{Date.now()}</Moment></p>
                                </div>    
                            </div>
                        );
                    }
                    return (
                        <div key={message._id} className="float-left text-left alert alert-secondary w-75">
                            <p><b>{message.user}:</b> {message.message}</p>
                            <p className="text-right"><Moment format="ddd, hh:mma">{Date.now()}</Moment></p>                                 
                        </div>
                    );
                })}
                </div>);
       
    }

    render() {

        return (
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">
                        <div className="container-fluid chat-window" ref="messageList">
                            {this.renderHistory()}
                            {this.renderSocketMessages()}
                        </div>
                    </div>
                    <div className="container-fluid card-body">
                        <form onSubmit={this.sendMessage}>
                            <textarea
                                type="text"
                                className="form-control"
                                value={this.state.message}
                                onKeyDown={this.onEnterPress}
                                onChange={ev => this.setState({ message: ev.target.value })} />
                            <button type="submit" className="btn btn-sm btn-primary float-right bump">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { chat: state.chat, auth: state.auth, chatData: state.chatData };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchChat : fetchChat }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);