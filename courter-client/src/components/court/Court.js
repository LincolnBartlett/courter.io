import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchTopics,
  newIceBreaker,
  fetchIceBreakersByCat,
  startChat,
  fetchChatList,
  rejectIceBreaker,
  acceptIceBreaker
} from "../../actions/index";
import { bindActionCreators } from "redux";
import ChatList from "../chat/ChatList";
import "../../style/court.css";
import Moment from "react-moment";

class Court extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      topic: "select a category....",
      message: "",
      topic_id: "",
      courtstate: "listen",
      category_id: "",
      listenstate: 0
    };

    this.onReplyEnterPress = ev => {
      if (ev.keyCode === 13 && ev.shiftKey === false) {
        this.replyIceBreaker(this.state.message, ev);
      }
    };

    this.onSendEnterPress = ev => {
      if (ev.keyCode === 13 && ev.shiftKey === false) {
        this.newIceBreaker(this.state.message, ev);
      }
    };

    this.handlePass = (ice_id) => {
      let newstate = this.state.listenstate;
      newstate = newstate + 1;
      this.props.rejectIceBreaker(this.props.auth._id, ice_id);
      if (newstate === this.props.icebreakers.length) {
        this.setState({ listenstate: 0, message: "" });
        this.props.fetchIceBreakersByCat(this.state.category_id, this.props.auth._id);
      } else {
        this.setState({ listenstate: newstate, message: "" });
      }
    };
    this.listenIncrement = () => {
      let newstate = this.state.listenstate;
      newstate = newstate + 1;
      if (newstate === this.props.icebreakers.length) {
        this.setState({ listenstate: 0, message: "" });
        this.props.fetchIceBreakersByCat(this.state.category_id, this.props.auth._id);
      } else {
        this.setState({ listenstate: newstate, message: "" });
      }
    };
  }

  //COMPONENT NAVIGATION
  renderCategories() {
    switch (this.props.categories) {
      case null:
        return <div />;
      case false:
        return <div />;
      default:
        return (
          
            <div className="form-row">
              {this.props.categories.map(category => {
                return (
                  <div key={category._id} className="">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        this.handleCategoryClick(category._id, category.title)
                      }
                    >
                      {category.title}
                    </button>
                  </div>
                );
              })}
            </div>
          
        );
    }
  }

  handleCategoryClick(category_id, category_title) {
    this.props.fetchTopics(category_id);
    this.props.fetchIceBreakersByCat(category_id, this.props.auth._id);
    this.setState({
      category: category_title,
      category_id: category_id,
      message: "",
      listenstate: 0
    });
  }

  renderTopics() {
    switch (this.props.topics) {
      case null:
        return <div />;
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
                      this.setState({
                        topic_id: topic._id,
                        topic: topic.title,
                        listenstate: 0,
                        message: ""
                      })
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

  renderCourt() {
    switch (this.state.courtstate) {
      case "listen":
        return <div>{this.renderListen()}</div>;
      case "compose":
        return <div>{this.renderCompose()}</div>;
      default:
        return <div />;
    }
  }

  //ICE BREAKER WRITE
  renderCompose() {
    return (
      <div>
        <div className="topic-text">
          <h1 className="display-5 text-right">{this.state.topic}</h1>
        </div>
        <div className="row card-body">
          <div className="col-md-6">{this.renderTopics()}</div>
          <div className="col-md-6">{this.renderIceBreakerForm()}</div>
        </div>
      </div>
    );
  }

  renderIceBreakerForm() {
    switch (this.state.topic_id) {
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
              <button
                type="submit"
                className="btn btn-primary form-control bump"
              >
                Compose Ice Breaker
              </button>
            </div>
          </form>
        );
    }
  }

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

  //ICE BREAKER REPLY
  renderListen() {
    switch (this.props.icebreakers) {
      case null:
        return <h1 className="text-right display-5">select a category....</h1>;
      default:
      console.log(this.props.icebreakers);
      console.log(this.props.icebreakers.length);
      if (this.props.icebreakers.length === 0){
        return <div>Sorry. There are currently no icebreakers for this category</div>
      }
        return (
          <div>

            <h1 className="text-right display-5">
              {this.props.icebreakers[this.state.listenstate].topic.title}
            </h1>
            <div className="form-row">
              <div className="col-md-6">
              <h3>
              {this.props.icebreakers[this.state.listenstate].author.givenName}
            </h3>
              </div>
              <div className="col-md-3">
                <button
                  className="form-control btn btn-primary"
                  onClick={ev => this.handlePass(this.props.icebreakers[this.state.listenstate]._id)}
                >
                 Hard Pass
                </button>
              </div>
              <div className="col-md-3">
              <button
                  className="form-control btn btn-info"
                  onClick={ev => this.listenIncrement()}
                >
                  Maybe Later
                </button>
              </div>
            </div>
            <hr />
            <div className="float-left text-left w-75">
              <div className="alert alert-success">
                <p>
                  {this.props.icebreakers[this.state.listenstate].topic.title}{" "}
                  {this.props.icebreakers[this.state.listenstate].message}
                </p>
                <p className="text-left small mb-0">
                  <Moment format="MMM DD, YYYY hh:mma">
                    {this.props.icebreakers[this.state.listenstate].timeStamp}
                  </Moment>
                </p>
              </div>
            </div>
            {this.renderIceBreakerReplyMessage()}
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

                <button
                  type="submit"
                  className="btn btn-primary form-control bump"
                >
                  Reply Ice Breaker
                </button>
              </div>
            </form>
          </div>
        );
    }
  }

  renderIceBreakerReplyMessage() {
    switch (this.state.message) {
      case "":
        return <div />;
      default:
        return (
          <div className="float-right text-right  w-75">
            <div className="alert alert-info">
              <p>{this.state.message}</p>
              <p className="text-right small mb-0">
                <Moment format="MMM DD, YYYY hh:mma">{Date.now()}</Moment>
              </p>
            </div>
          </div>
        );
    }
  }

  replyIceBreaker(reply, ev) {
    ev.preventDefault();
    const replydata = {
      message: reply,
      user_id: this.props.auth._id,
      recipient_id: this.props.icebreakers[this.state.listenstate].author._id,
      topic_id: this.props.icebreakers[this.state.listenstate].topic._id,
      category_id: this.state.category_id,
      icebreaker_id: this.props.icebreakers[this.state.listenstate]._id
    };
    this.props.startChat(replydata);
    this.props.acceptIceBreaker(this.props.auth._id, this.props.icebreakers[this.state.listenstate]._id);
    this.listenIncrement();
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="form-row">
                  <div className="col-md-4 offset-4">
                    <button
                      className="btn btn-outline-primary form-control"
                      onClick={ev => {
                        this.setState({ courtstate: "listen", message: "" });
                      }}
                    >
                      Read Ice Breakers
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-outline-primary form-control"
                      onClick={ev => {
                        this.setState({ courtstate: "compose", message: "" });
                      }}
                    >
                      Create Ice Breakers
                    </button>
                  </div>
                </div>
                <hr />
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
      startChat: startChat,
      fetchChatList: fetchChatList,
      rejectIceBreaker: rejectIceBreaker,
      acceptIceBreaker: acceptIceBreaker
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
