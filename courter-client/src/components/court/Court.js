import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchTopics,
  newIceBreaker,
  fetchIceBreakersByCat,
  fetchIceBreakersByUser,
  fetchIceBreakersByAll,
  startChat,
  fetchChatList,
  rejectIceBreaker,
  acceptIceBreaker,
  setViewState
} from "../../actions/index";
import { bindActionCreators } from "redux";
import Settings from "../user/Settings";
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
      courtstate: "read",
      category_id: "",
      readcount: 0,
      replystate: false,
      settingState: false
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

    this.handlePass = ice_id => {
      let newstate = this.state.readcount;
      newstate = newstate + 1;
      this.props.rejectIceBreaker(this.props.auth._id, ice_id);
      if (newstate === this.props.icebreakers.length) {
        this.setState({ readcount: 0, message: "" });
        if (this.state.category_id.length === 0) {
          this.props.fetchIceBreakersByAll(this.props.auth._id);
        } else {
          this.props.fetchIceBreakersByCat(
            this.state.category_id,
            this.props.auth._id
          );
        }
      } else {
        this.setState({ readcount: newstate, message: "" });
      }
    };
    this.readIncrement = () => {
      let newstate = this.state.readcount;
      newstate = newstate + 1;
      if (newstate === this.props.icebreakers.length) {
        this.setState({ readcount: 0, message: "" });
        if (this.state.category_id.length === 0) {
          this.props.fetchIceBreakersByAll(this.props.auth._id);
        } else {
          this.props.fetchIceBreakersByCat(
            this.state.category_id,
            this.props.auth._id
          );
        }
      } else {
        this.setState({ readcount: newstate, message: "" });
      }
    };
  }

  renderCourt() {
    switch (this.state.courtstate) {
      case "read":
        return <div>{this.renderRead()}</div>;
      case "write":
        return <div>{this.renderWrite()}</div>;
      default:
        return <div />;
    }
  }

  //COMPONENT NAVIGATION
  renderCategories() {
    switch (this.props.categories) {
      case null:
        return <div />;
      case false:
        return <div />;
      default:
        switch (this.state.courtstate) {
          case "read":
            return (
              <div className="form-row">
                <a
                  key="all"
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    this.props.fetchIceBreakersByAll(this.props.auth._id);
                    this.setState({
                      settingState: false
                    });
                  }}
                >
                  All
                </a>
                {this.props.categories.map(category => {
                  return (
                    <a
                      key={category._id}
                      className="list-group-item list-group-item-action"
                      onClick={() =>
                        this.handleCategoryClick(category._id, category.title)
                      }
                    >
                      {category.title}
                    </a>
                  );
                })}
              </div>
            );
          case "write":
            return (
              <div className="form-row">
                {this.props.categories.map(category => {
                  return (
                    <a
                      key={category._id}
                      className="list-group-item list-group-item-action"
                      onClick={() =>
                        this.handleCategoryClick(category._id, category.title)
                      }
                    >
                      {category.title}
                    </a>
                  );
                })}
              </div>
            );

          default:
            return <div />;
        }
    }
  }

  handleCategoryClick(category_id, category_title) {
    this.props.fetchTopics(category_id);
    this.props.fetchIceBreakersByCat(category_id, this.props.auth._id);
    this.setState({
      category: category_title,
      category_id: category_id,
      message: "",
      readcount: 0,
      settingState: false
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
                        readcount: 0,
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

  //ICE BREAKER WRITE
  renderWrite() {
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
                write Ice Breaker
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

  //ICE BREAKER READ & REPLY
  renderRead() {
    switch (this.props.icebreakers) {
      case null:
        this.props.fetchIceBreakersByAll(this.props.auth._id);
        return <h1 className="text-right display-5">loading....</h1>;
      default:
        if (this.props.icebreakers.length === 0) {
          return (
            <div>
              {this.renderSettings()}
              Sorry. There are currently no icebreakers for this category
            </div>
          );
        }
        return (
          <div>
            <h3>
              {this.props.icebreakers[this.state.readcount].author.nickname}
            </h3>
            <p>
              Age: {this.props.icebreakers[this.state.readcount].author.age}
              <br />
              {this.props.icebreakers[this.state.readcount].author.sex}
            </p>
            {this.renderChoiceButtons()}
            <hr/>
            {this.renderSettings()}
            <br />
            <br/>
            {this.replyAlert()}
            <div className="border jumbotron reply-window">
              <div className="float-left text-left w-75">
                <div className="alert alert-light">
                  <p>
                    {this.props.icebreakers[this.state.readcount].topic.title}
                    {this.props.icebreakers[this.state.readcount].message}
                  </p>
                  <p className="text-left small mb-0">
                    <Moment format="MMM DD, YYYY hh:mma">
                      {this.props.icebreakers[this.state.readcount].timeStamp}
                    </Moment>
                  </p>
                </div>
              </div>
              {this.renderIceBreakerReplyMessage()}
            </div>
            {this.renderReplyForm()}
          </div>
        );
    }
  }

  renderSettings() {
    switch (this.state.settingState) {
      case false:
        return (
          <div>
            <button
              className="btn btn-sm btn-outline-primary float-right"
              onClick={() => this.setState({ settingState: true })}
            >
              Search Settings
            </button>
          </div>
        );
      default:
        return (
          <div>
            <button
              className="btn btn-sm btn-outline-primary float-right"
              onClick={() => this.setState({ settingState: false })}
            >
              Back
            </button>
            <Settings />
          </div>
        );
    }
  }

  renderChoiceButtons() {
    switch (this.state.replystate) {
      case false:
        return (
          <div className="form-row">
            <div className="col">
              <button
                className="btn btn-lg btn-primary form-control"
                onClick={ev => this.readIncrement()}
              >
                Maybe Later
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-lg btn-danger form-control"
                onClick={ev =>
                  this.handlePass(
                    this.props.icebreakers[this.state.readcount]._id
                  )
                }
              >
                Hard Pass
              </button>
            </div>
          </div>
        );

      case true:
        return <div />;
      default:
        return <div />;
    }
  }

  renderReplyForm() {
    switch (this.state.replystate) {
      case false:
        return (
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
                Reply to Ice Breaker
              </button>
            </div>
          </form>
        );

      case true:
        return <div />;
      default:
        return <div />;
    }
  }

  renderIceBreakerReplyMessage() {
    switch (this.state.message) {
      case "":
        return <div />;
      default:
        return (
          <div className="float-right text-right  w-75">
            <div className="alert alert-primary">
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
      recipient_id: this.props.icebreakers[this.state.readcount].author._id,
      topic_id: this.props.icebreakers[this.state.readcount].topic._id,
      category_id: this.state.category_id,
      icebreaker_id: this.props.icebreakers[this.state.readcount]._id
    };
    this.props.startChat(replydata);
    this.props.acceptIceBreaker(
      this.props.auth._id,
      this.props.icebreakers[this.state.readcount]._id
    );
    this.setState({ replystate: true });
  }

  handleReplyClose() {
    this.setState({ replystate: false });
    this.readIncrement();
  }

  replyAlert() {
    switch (this.state.replystate) {
      case false:
        return <div />;

      case true:
        return (
          <div class="alert alert-success reply-alert">
            <div className="container-fluid">
              <strong>Reply sent!</strong>
              <button
                type="button"
                className="close"
                onClick={() => this.handleReplyClose()}
              >
                &times;
              </button>
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }



  renderReadWriteNav() {
    switch (this.state.courtstate) {
      case "read":
        return (
          <div className="row text-center">
            <div className="col">
              <h1>Reading Ice Breakers</h1>
              <button
                className="btn btn-outline-info form-control"
                onClick={ev => {
                  this.setState({ courtstate: "write", message: "" });
                }}
              >
                Would you like to write a few?
              </button>
            </div>
          </div>
        );
      case "write":
        return (
          <div className="row text-center">
            <div className="col">
              <h1>Writing Ice Breakers</h1>
              <button
                className="btn btn-outline-info form-control"
                onClick={ev => {
                  this.setState({ courtstate: "read", message: "" });
                }}
              >
                Would you like to read a few?
              </button>
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">{this.renderCourt()}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                {this.renderReadWriteNav()}
                <hr />
                <h4>Categories:</h4>
                <div className="list-group"> {this.renderCategories()}</div>
              </div>
            </div>
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
    icebreakers: state.icebreakers,
    usericebreakers: state.usericebreakers,
    geolocation: state.geolocation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCategories: fetchCategories,
      fetchTopics: fetchTopics,
      newIceBreaker: newIceBreaker,
      fetchIceBreakersByCat: fetchIceBreakersByCat,
      fetchIceBreakersByUser: fetchIceBreakersByUser,
      fetchIceBreakersByAll: fetchIceBreakersByAll,
      startChat: startChat,
      fetchChatList: fetchChatList,
      rejectIceBreaker: rejectIceBreaker,
      acceptIceBreaker: acceptIceBreaker,
      setViewState: setViewState
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
