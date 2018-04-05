import React, { Component } from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";

class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'username',
            message: '',
            messages: []
        };

        this.socket = io('10.0.0.138:5000');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    
    render(){

        return (
            <div>
                <div className="row">
                    <div className="col-5 offset-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                    <div><p>{this.state.username}</p></div>
                                
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Chat;