import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Court from './Court';
import Header from './Header';
import login from './login';
import { connect } from 'react-redux';
import * as actions from '../actions';


const Dashboard = () => <h2> Dashboard </h2>;
const SurveyNew = ()=> <h2> SurveyNew</h2>

class App extends Component {
    componentDidMount(){
     this.props.fetchUser();
     this.props.fetchChat();
    }
    
    render(){
      return (
        <div >
          <BrowserRouter>
            <div>
              <Header/>
              <br/>
              <Route exact path ="/" component = {login}/>
              <Route exact path ="/court" component = {Court}/>
              <Route exact path ="/surveys" component = {Dashboard}/>
              <Route path ="/surveys/new" component = {SurveyNew}/>
            </div>
          </BrowserRouter>
        </div>
      );
    };
  }


export default connect(null, actions)(App);
