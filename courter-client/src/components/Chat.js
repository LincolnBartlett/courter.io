import React, { Component } from "react";
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';
import io from "socket.io-client";
import Moment from 'react-moment';
import '../style/court.css';
import axios from 'axios';

class Chat extends Component{

    constructor(props){
        super(props);    
        this.state = {
            message: '',
            messages: []
        };

        this.socket = io.connect();

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        this.socket.on('connect', (data)=>{
            this.socket.emit('room', this.props.match.params.chatId)
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, {message: data.message, user: data.givenName, userId: data.user, _id : data._id}]});
        };

        this.onEnterPress = (e) => {
            if(e.keyCode === 13 && e.shiftKey === false) {
              this.sendMessage(e);
            }
          }

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                message: this.state.message,
                user: this.props.auth._id,
                givenName: this.props.auth.givenName,
                chat: this.props.match.params.chatId
            });
            this.setState({message: ''});

        }
    }
    
    componentDidMount(){
        const room = this.props.match.params.chatId;
            axios.post(`/api/chat/load/${room}`).then(res => {
                res.data.forEach((message)=>{
                    this.setState({messages: [...this.state.messages, {message: message.message, user: message.author.givenName, userId: message.author._id, _id : message._id}]});
                });
            });
         }
    
    componentDidUpdate(){
        this.scrollToBottom();
    }
    
    scrollToBottom = () => {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    renderUser(){
        switch(this.props.auth){
            case null:
                return;
            case false:
            return <a className="nav-link" href="/auth/google" method="POST">Sign In With Google </a>;
            default:
              return <div>{this.props.auth.givenName}:</div>;
        }
    }

    renderMessages(){
        switch(this.props.auth){
           case null:
                return;
            case false:
                return;
            default:
                if (this.state.messages.length === 0 ){
                    return <p>Loading...</p>;
                    }
                return (
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
    }


    render(){

        return (
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">
                    <div className="container-fluid chat-window" ref ="messageList">
                    
                       {this.renderMessages()}

                        
                    </div>
                </div>
                <div className="container-fluid card-body">
                    <form onSubmit={this.sendMessage}>
                        <textarea 
                            type="text" 
                            className="form-control" 
                            value={this.state.message} 
                            onKeyDown={this.onEnterPress} 
                            onChange={ev => this.setState({message: ev.target.value})}/>
                        <button type="submit" className="btn btn-sm btn-primary float-right bump">Send</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    return { chat: state.chat, auth: state.auth };
}
export default connect(mapStateToProps)(Chat);