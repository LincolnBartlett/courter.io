import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chat from './Chat';
import Header from './Header';
import login from './login';
import UserList from './UserList';
import { connect } from 'react-redux';
import * as actions from '../actions';


const Dashboard = () => <h2> Dashboard </h2>;
const SurveyNew = ()=> <h2> SurveyNew</h2>

class App extends Component {
    componentDidMount(){
     this.props.fetchUser();
     this.props.fetchChat();
     this.props.fetchAllUsers();
    }
    
    render(){
      return (
        <div >
          <BrowserRouter>
            <div>
              <Header/>
              <br/>
              <div className="container">
              <div className="row">
                <Route exact path ="/" component = {login}/>
                <Route path ="/chat/:chatId" component = {Chat}/>
                <Route exact path ="/surveys" component = {Dashboard}/>
                <Route path ="/surveys/new" component = {SurveyNew}/>
                <UserList />
              </div>
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
    };
  }


export default connect(null, actions)(App);
