import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchTopics, newIceBreaker,fetchIceBreakersByCat, startChat } from "../actions/index";
import { bindActionCreators } from "redux";
import ChatList from "./ChatList";
import "../style/court.css";
import Moment from "react-moment";
class Court extends Component {
  constructor(props) {
    super(props);
    this.listenIncrement = this.listenIncrement.bind(this);
    this.listenDecrement = this.listenDecrement.bind(this);
    this.state = {
    category:"",
      topic: "",
      message: "",
      topic_id: "",
      courtstate: "listen",
      category_id: "",
      listenstate: 0
    };
  }

  renderCategories() {
    //refactor onClick
    switch (this.props.categories) {
      case null:
        return <div />;
      case false:
        return <div />;
      default:
        return (
          <nav>
            <ul className="navbar-nav">
              {this.props.categories.map(category => {
                return (
                  <li key={category._id} className="nav-item">
                    <button
                      className="btn btn-lg btn-link"
                      onClick={() => {this.props.fetchTopics(category._id);this.props.fetchIceBreakersByCat(category._id);this.setState({ category: category.title, category_id : category._id})}}
                    >
                      {category.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        );
    }
  }

  renderTopics() {
    switch (this.props.topics) {
      case null:
        return (<div>
            Choose a Category to get started!
        </div>);
      case false:
        return <div />;
      default:
        return (
          <div>
            <div className="list-group">
              {this.props.topics.map(topic => {
                return (
                  <a
                    className="list-group-item list-group-item-action"
                    key={topic._id}
                    onClick={ev =>
                      this.setState({ topic_id: topic._id, topic: topic.title, listenstate: 0 })
                    }
                  >
                    {topic.title}
                  </a>
                );
              })}
            </div>
          </div>
        );
    }
  }

  renderIceBreakerForm() {
    switch (this.state.topic) {
      case null:
        return <div />;
      case "":
        return <div />;
      default:
        return (
          <form onSubmit={ev => this.newIceBreaker(this.state.message, ev)}>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              value={this.state.message}
              onKeyDown={this.onSendEnterPress}
              onChange={ev => this.setState({ message: ev.target.value })}
              rows="5"
              required
            />
            <button type="submit" className="btn btn-primary form-control bump">
              Compose Ice Breaker
            </button>
            </div>
          </form>
        );
    }
  }



  onSendEnterPress(ev){
    if (ev.keyCode === 13 && ev.shiftKey === false) {

        this.newIceBreaker(this.state.message, ev);
  
    }
  };
  onReplyEnterPress(ev){
    if (ev.keyCode === 13 && ev.shiftKey === false) {

        this.replyIceBreaker(this.state.message, ev);
    
    }
  };

  newIceBreaker(icebreaker, ev) {
    ev.preventDefault();
    const icebreakerdata = {
      message: icebreaker,
      author_id: this.props.auth._id,
      topic_id: this.state.topic_id,
      category_id: this.state.category_id
    };
    this.props.newIceBreaker(icebreakerdata);
  }

  replyIceBreaker(reply, ev) {
    ev.preventDefault();
    const replydata = {
      message: reply,
      user_id: this.props.auth._id,
      recipient_id: this.props.icebreakers[this.state.listenstate].author._id,
      topic_id: this.props.icebreakers[this.state.listenstate].topic._id,
      category_id: this.state.category_id,
      icebreaker_id:this.props.icebreakers[this.state.listenstate]._id
    };
    this.props.startChat(replydata);
  }
  renderCompose(){
      return(<div>
        <div className="topic-text">
        <h1 className="display-4 text-right">{this.state.topic}</h1>
        </div>
        <div className="row card-body">
          <div className="col-md-6">
            {this.renderTopics()}
          </div>
          <div className="col-md-6">
            {this.renderIceBreakerForm()}
          </div>
        </div>
      </div>);
  }

  listenIncrement(){
    let newstate = this.state.listenstate;
    newstate = newstate + 1;
    if(newstate == this.props.icebreakers.length){
      this.setState({listenstate : 0});
    }else{
      this.setState({listenstate : newstate});
    }
    
  }

  listenDecrement(){
    let newstate = this.state.listenstate;
    newstate = newstate - 1;
    if (newstate == -1){
      this.setState({listenstate : this.props.icebreakers.length - 1});
    }else{
      this.setState({listenstate : newstate});
    }

  }

  renderListen(){
      switch(this.props.icebreakers){
          case null:
          return <div>null</div>;
          default:
          return(<div>
            <div className="form-row">
            <div className="col-md-6">
              <button className="form-control btn btn-danger" onClick={ev=>this.listenDecrement()}>Last</button>
              </div>
              <div className="col-md-6">  
              <button className="form-control btn btn-danger" onClick={ev=>this.listenIncrement()}>Next</button>
              </div>

            </div>
            <h1 className="text-right display-4">{this.props.icebreakers[this.state.listenstate].topic.title}</h1>
            <h3>{this.props.icebreakers[this.state.listenstate].author.givenName}</h3>
            <hr/>
    
            <div className="row card-body">
            
      <div className="float-left text-left w-75">
        <div className="alert alert-success">
          <p>{this.props.icebreakers[this.state.listenstate].topic.title} {this.props.icebreakers[this.state.listenstate].message}</p>
          <p className="text-left small mb-0">
            <Moment format="MMM DD, YYYY hh:mma">{this.props.icebreakers[this.state.listenstate].timeStamp}</Moment>
          </p>
        </div>
      </div>

            <div className="float-right text-right  w-75">
        <div className="alert alert-primary">
          <p>{this.state.message}</p>
          <p className="text-right small mb-0">
            <Moment format="MMM DD, YYYY hh:mma">{Date.now()}</Moment>
          </p>
        </div>
      </div>

            </div>
            <form onSubmit={ev => this.replyIceBreaker(this.state.message, ev)}>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              value={this.state.message}
              onKeyDown={this.onReplyEnterPress}
              onChange={ev => this.setState({ message: ev.target.value })}
              rows="5"
              required
            />
            <button type="submit" className="btn btn-primary form-control bump">
              Reply Ice Breaker
            </button>
            </div>
          </form>

          </div>);
      }

    }


    renderCourt(){
        switch(this.state.courtstate){
            case "listen":
                return(<div>{this.renderListen()}</div>);
            case "compose":
                return(<div>{this.renderCompose()}</div>);
            default:
                return<div/>;
        }
    }

  
    render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
          <div className="card court-window">
        <div className="card-body">
        <div className="form-row">
            <div className="col-md-4 offset-4">
                    <button
                        className="btn btn-primary form-control"
                        onClick={(ev)=>{this.setState({courtstate: "listen"})}}
                    >Listen</button>
            </div>
            <div className="col-md-4">
                    <button
                        className="btn btn-primary form-control"
                        onClick={(ev)=>{this.setState({courtstate: "compose"})}}
                    >Compose</button>
            </div>
        </div>
        <hr/>
        <nav className="navbar navbar-expand">
          {this.renderCategories()}
        </nav>
        {this.renderCourt()}
        </div>
            
            </div>
          </div>
          <div className="col-md-4">
            <ChatList />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    topics: state.topics,
    auth: state.auth,
    icebreakers: state.icebreakers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCategories: fetchCategories,
      fetchTopics: fetchTopics,
      newIceBreaker: newIceBreaker,
      fetchIceBreakersByCat: fetchIceBreakersByCat,
      startChat : startChat
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
