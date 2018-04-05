import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <a className="nav-link" href="/auth/google">Sign In With Google </a>;
            default:
        }       return <a className="nav-link" href="/auth/logout">Logout </a>;
    }

    render () {
        console.log(this.props);
        return (
            <div>
               <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" >courter</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            {this.renderContent()}
                        </li>
                        <li className="nav-item">
                            
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);