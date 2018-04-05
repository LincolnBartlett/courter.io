import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chat from './Chat';
import Header from './Header';
import login from './login';
import { connect } from 'react-redux';
import * as actions from '../actions';


const Landing = () => <h2> Landing </h2>;
const Dashboard = () => <h2> Dashboard </h2>;
const SurveyNew = ()=> <h2> SurveyNew</h2>

class App extends Component {
    componentDidMount(){
     this.props.fetchUser();
     
    }
    
    render(){
      return (
        <div >
          <BrowserRouter>
            <div>
              <Header/>
              <Route exact path ="/" component = {login}/>
              <Route exact path ="/chat" component = {Chat}/>
              <Route exact path ="/surveys" component = {Dashboard}/>
              <Route path ="/surveys/new" component = {SurveyNew}/>
            </div>
          </BrowserRouter>
        </div>
      );
    };
  }


export default connect(null, actions)(App);
