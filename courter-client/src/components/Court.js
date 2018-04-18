import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchTopics, newIceBreaker,fetchIceBreakersByCat } from "../actions/index";
import { bindActionCreators } from "redux";
import ChatList from "./ChatList";
import "../style/court.css";
class Court extends Component {
  constructor(props) {
    super(props);

    this.state = {
    category:"",
      topic: "",
      message: "",
      topic_id: "",
      courtstate: "compose",
      category_id: ""
    };
  }

  renderCategories() {
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
                      this.setState({ topic_id: topic._id, topic: topic.title })
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
              onKeyDown={this.onEnterPress}
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

  onEnterPress(ev){
    if (ev.keyCode === 13 && ev.shiftKey === false) {
      if (this.state.message.length < 1) {
        this.newIceBreaker(this.state.message, ev);
      }
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

  renderListen(){
      switch(this.props.icebreakers){
          case null:
          return <div>null</div>;
          default:
          return(<div>
            <div className="row card-body">
            {this.props.icebreakers.map(icebreaker => {
              return (<div key={icebreaker._id}>
                        <h3>{icebreaker.topic.title}</h3>
                        <p>{icebreaker.author.givenName}: {icebreaker.message}</p>
                    </div>);
            })}
            </div>
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
      fetchIceBreakersByCat: fetchIceBreakersByCat
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
