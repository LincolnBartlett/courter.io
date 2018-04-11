import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class UserList extends Component {

    constructor(props){
        super(props);    
        this.state = {
            chats: [],
            loaded: false
        };

    }  
    
    renderList(){
        switch(this.props.users){
            case null:
                return;
            case false:
                return ;
            default:
               return (
                    <ul>
                        {this.props.users.map(user => {
                            return <li key={user._id}><p>{user.givenName}{user.familyName}</p></li>
                        })} 
                    </ul>
                );
        }
    }

    renderChats(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return ;
            default:
                if(!this.state.loaded){
                    axios.post(`/api/chat/chatlist/${this.props.auth._id}`).then(res => {
                            res.data.forEach(chat => {
                                this.setState({chats: [...this.state.chats, {_id: chat._id}]});
                            });
                            
                        });
                    this.setState({loaded:true });    
                    }
                    return (
                        <ul>
                            {this.state.chats.map(chat => {
                                return <div><a href ={`/chat/${chat._id}`}>{chat._id}</a></div>
                            })}
                        </ul>
                    ); 
        }
    }

    render () {
        return (
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header text-center">
                        <h3>User List</h3>
                    </div>
                    <div className="card-body">
                        {this.renderList()}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header text-center">
                        <h3>Chat List</h3>
                    </div>
                    <div className="card-body">
                        {this.renderChats()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { users: state.users,
            auth: state.auth };
}

export default connect(mapStateToProps)(UserList);