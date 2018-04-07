import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    
    renderContent(){
        console.log('From Header.js\n',this.props.auth);
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <a className="nav-link" href="/auth/google" method="POST">Sign In With Google </a>;
            default:
        }       return (<div>
                            <p className="nav-item">{this.props.auth.googleId}</p> 
                            <a className="nav-link" href="/auth/logout">Logout </a>
                        </div>);
    }

    render () {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className='container'>
                    <Link to={'/'} className="navbar-brand" >courter</Link>
                    <div>
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            {this.renderContent()}
                        </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);