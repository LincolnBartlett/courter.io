import React, { Component } from "react";
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';
import io from "socket.io-client";
import Moment from 'react-moment';
import '../style/court.css';

class Court extends Component{

    componentDidUpdate(){
        this.scrollToBottom();
    }
    scrollToBottom = () => {
        const { messageList } = this.refs;
        console.log(this.refs);
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    renderMessages(){
        switch(this.props.chat){
            case null:
                return <p>null</p>;
            case false:
                return <p>False</p>;
            default:
              return (
              <div>
              {this.props.chat.map(message => {
                  if(message.author._id === this.props.auth._id){
                    return (
                    <div className="float-right text-left alert alert-primary w-75">
                        <p><b>{message.author.givenName}:</b> {message.message}</p>
                        <p className="text-right"><Moment format="ddd, hh:mma">{message.timeStamp}</Moment></p>
                    </div>);
                  }
                    return (
                        <div className="float-left text-left alert alert-secondary w-75">
                            <p><b>{message.author.givenName}:</b> {message.message}</p>
                            <p className="text-right"><Moment format="ddd, hh:mma">{message.timeStamp}</Moment></p>
                        </div>
                        );
                    })}
              </div>)
        }
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


    constructor(props){
        super(props);
        this.state = {
            message: '',
            messages: []
        };

        this.socket = io('10.0.0.138:5000');


        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        // this.socket.on('connect', function(data){
        //     this.socket.emit('ON_LOAD', {

        //     });
        //     startUp(data);
        // });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, {message: data.message, user: data.givenName, userId: data.user}]});
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
                givenName: this.props.auth.givenName
            });
            this.setState({message: ''});

        }
    }
    
    render(){

        return (
            <div>
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card">
                            <div className="card-header">
                                <div className="container-fluid chat-window" ref ="messageList">
                                
                                    {this.renderMessages()}


                                    {this.state.messages.map(message => {
                                        if(message.userId === this.props.auth._id){
                                            return (
                                                <div className="float-right text-left  w-75">
                                                    <div className="alert alert-primary">
                                                        <p><b>{message.user}:</b> {message.message}</p>
                                                        <p className="text-right"><Moment format="ddd, hh:mma">{Date.now()}</Moment></p>
                                                    </div>    
                                                </div>
                                            );
                                        }
                                        return (
                                            <div className="float-left text-left alert alert-secondary w-75">
                                                <p><b>{message.user}:</b> {message.message}</p>
                                                <p className="text-right"><Moment format="ddd, hh:mma">{Date.now()}</Moment></p>
                                                
                                            </div>
                                        );
                                    })}
                                    

                                </div>
                                <div>

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
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log('State from Chat.js\n',state);
    return { chat: state.chat, auth: state.auth };
}
export default connect(mapStateToProps)(Court);