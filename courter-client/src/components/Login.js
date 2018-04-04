
import React from "react";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        };

    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Login</div>
                            </div>
                            <div className="card-footer">
                                <div className="form-group">
                                    <form action="/user/login" method="POST">
                                        <input className="form-control" type="text" placeholder="username" name="username"></input>
                                        <input className="form-control" type="password" placeholder="password" name="password"></input>
                                    
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;