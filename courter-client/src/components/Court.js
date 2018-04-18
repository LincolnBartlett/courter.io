import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchTopics, newIceBreaker } from "../actions/index";
import { bindActionCreators } from "redux";
import ChatList from './ChatList';

class Court extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          topic: "",
          message: "",
          topic_id: ""
        };
    
      }
    renderCategories(){

        switch(this.props.categories){
            case null:
                return <div/>;
            case false:
                return <div/>;
            default:
                return(<nav>
                    <ul className="navbar-nav">
                        {this.props.categories.map(category => {
                            return (<li className="nav-item">
                                <button
                                className="btn btn-lg btn-link" 
                                key={category._id}
                                onClick={() => this.props.fetchTopics(category._id)} >{category.title}</button>
                                </li>);
                        })}
                    </ul>
                        </nav>);
        }
    }


    renderTopics(){
        switch(this.props.topics){
            case null:
                return <div/>;
            case false:
                return <div/>;
            default:
                return(<div>
                    <ul className="list-group">
                        {this.props.topics.map(topic => {
                            return (<li 
                                        className="list-group-item"
                                        key={topic._id}>
                                    <a
                                    onClick={ev => this.setState({ topic_id: topic._id,topic: topic.title })}>
                                    {topic.title}</a>
                                </li>);
                        })}
                    </ul>
                        </div>);
        }
    }

    renderIceBreakerForm(){
        switch(this.props.topics){
            case null:
                return <div/>;
            case false:
                return <div/>;
            default:
                return(      
                <form onSubmit={ev => this.newIceBreaker(this.state.message, ev)}>
                    <br/>

                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.message}
                    onKeyDown={this.onEnterPress}
                    onChange={ev => this.setState({ message: ev.target.value })}
                  />
                  
                  <button
                    type="submit"
                    className="btn btn-primary form-control bump"
                  >
                    Submit Ice Breaker
                  </button>
                </form>
              );
        }

    }

    onEnterPress = ev => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
          this.newIceBreaker(this.state.message, ev);
        }
      };

    newIceBreaker(icebreaker, ev){
        ev.preventDefault();
        const icebreakerdata = {
            message : icebreaker,
            author_id: this.props.auth._id,
            topic_id: this.state.topic_id
        };
        this.props.newIceBreaker(icebreakerdata);
    }

  render() {
    return (<div className="container"> 
          <div className="row">
          <div className="col-md-8">
            <div className="card">
                <nav className="navbar navbar-expand">
                    {this.renderCategories()}
                </nav>
                <div className="row card-body">
                    <div className="col-md-6">
                        {this.renderTopics()}
                        
                    </div>
                    <div className="col-md-6">
                    <h5 className="display-3">{this.state.topic}</h5>
                    <h5>{this.state.title}</h5>
                    <h5>{this.state.icebreaker}</h5>
                    <hr/>
                        {this.renderIceBreakerForm()}
                    </div>
                </div>
            </div>
           </div>
            <div className="col-md-4">
            <ChatList/>
            </div>
          </div>
        </div>);
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    topics: state.topics,
    auth: state.auth
    
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCategories: fetchCategories,
      fetchTopics: fetchTopics,
      newIceBreaker: newIceBreaker
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
