import React from 'react';

const login =()=> {

    return (
        <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="card">
                            <div className="card-body">
                                <ul>
                                <li><a href="/auth/google" method="POST">Sign In With Google </a></li>
                                </ul>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default login;