import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {

    renderHeader() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (<li className="nav-item">
                            <a className="nav-link" href="/api/auth/google" method="POST">Sign In With Google </a>
                        </li>);
            default:
               return (<li className="nav-item">     
                             <a className="nav-link" href="/api/auth/logout">Logout </a>  
                        </li>);
        }
    }

    renderUser() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return;
            default:
               return (<li className="nav-item">
                            <a className="nav-link">{this.props.auth.givenName} {this.props.auth.familyName}</a>
                        </li>);
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container'>
                   <img src="favicon.ico" className="navbar-brand" alt=""/>             
                    <ul className="navbar-nav">
                        {this.renderUser()}
                        {this.renderHeader()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);