import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setDistanceAndAge,
  setViewState,
  setUserLocation,
  setAllUserInfo,
  setTutorial
} from "../../actions/index";
import { bindActionCreators } from "redux";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: "location",
      age: 18,
      sex: "",
      nickname: "",
      agemax: 90,
      agemin: 18,
      distance: 50
    };
  }

  /*--------
    STEPS
  ---------*/
  //Location
  handleLocationClick() {
    const locationData = {
      user_id: this.props.auth._id,
      latitude: this.props.geolocation.latitude,
      longitude: this.props.geolocation.longitude
    };
    this.props.setUserLocation(locationData);
    this.setState({ step: "personal" });
  }
  renderLocationField() {
    return (
      <div className="card">
        <div className="card-body">
          <h2> Hi {this.props.auth.givenName},</h2>
          Thanks for signing up.
          <br />
          First things first, we need to know where you are to find other users
          in your area. This data will only be used to find other users and will
          never be shared with anyone.
          <br />
          <br />
          <button
            onClick={() => {
              this.handleLocationClick();
            }}
            className="btn btn-primary"
          >
            Update My Location
          </button>
        </div>
      </div>
    );
  }

  //Personal
  renderGeneration() {
    if (this.state.age <= 36) {
      return <div>Millennial</div>;
    }
    if (this.state.age >= 37 && this.state.age <= 55) {
      return <div>Generation X</div>;
    }
    if (this.state.age >= 56 && this.state.age <= 72) {
      return <div>Baby Boomer</div>;
    }
    if (this.state.age >= 73) {
      return <div>Silent Generation</div>;
    }
  }
  handlePersonalInfoClick() {
    const personalData = {
      user_id: this.props.auth._id,
      age: this.state.age,
      sex: this.state.sex,
      nickname: this.state.nickname
    };
    this.props.setAllUserInfo(personalData);
    this.setState({ step: "interests" });
  }
  renderPersonalInfoField() {
    return (
      <div className="card">
        <div className="card-body">
          <h2>Awesome!</h2>
          <br />
          Now, let's learn a bit about you.
          <br />
          <br />
          <div className="form-group">
            Give us a nickname so that other users have something to call you:
            <input
              placeholder="nickname"
              value={this.state.nickname}
              onChange={ev => this.setState({ nickname: ev.target.value })}
              className="form-control"
            />
            <br />
            How old are you?
            <h4>{this.state.age}</h4>
            {this.renderGeneration()}<small>(according to google)</small>
            <input
              className="form-control"
              type="range"
              min="18"
              max="90"
              step="1"
              value={this.state.age}
              onChange={ev => this.setState({ age: ev.target.value })}
            />
            <br />
            What is your gender?:
            <small>(will be fully inclusive at launch)</small>
            <select className="form-control" value={this.state.sex}
                onChange={ev => this.setState({ sex: ev.target.value })}>
                <option selected>Choose...</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            <br/>
            <button
              onClick={() => {
                this.handlePersonalInfoClick();
              }}
              className="btn btn-primary mb-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Interests
  handleMaxAgeSlider(ev) {
    this.setState({ agemax: ev.target.value });
  }
  handleMinAgeSlider(ev) {
    this.setState({ agemin: ev.target.value });
  }
  handleDistanceSlider(ev) {
    this.setState({ distance: ev.target.value });
  }
  handleIceBreakerButtonClick() {
    const agemax = parseInt(this.state.agemax, 10);
    const agemin = parseInt(this.state.agemin, 10);
    const distance = parseInt(this.state.distance, 10);
    const settingData = {
      user_id: this.props.auth._id,
      agemax: agemax,
      agemin: agemin,
      distance: distance
    };
    this.props.setDistanceAndAge(settingData);
    const tutorialData = {
      user_id: this.props.auth._id,
      tutorial: true
    }
    this.props.setTutorial(tutorialData);
    this.setState({ step: "done" });
    this.props.setViewState('court');
  }
  renderInterestsField() {
    return (
      <div className="card">
        <div className="card-body">
          Max Age: {this.state.agemax}
          <input
            className="form-control"
            max="80"
            min="18"
            step="1"
            type="range"
            value={this.state.agemax}
            onChange={ev => this.handleMaxAgeSlider(ev)}
          />
          Min Age: {this.state.agemin}
          <input
            className="form-control"
            max="80"
            min="18"
            step="1"
            type="range"
            value={this.state.agemin}
            onChange={ev => this.handleMinAgeSlider(ev)}
          />
          Distance: {this.state.distance}mi.
          <input
            className="form-control"
            max="200"
            min="20"
            step="5"
            type="range"
            value={this.state.distance}
            onChange={ev => this.handleDistanceSlider(ev)}
          />
          <hr />
          <button
            className="form-control btn btn-primary"
            onClick={() => {
              this.handleIceBreakerButtonClick();
            }}
          >
            Update
          </button>
        </div>
      </div>
    );
  }

  //DONE
  handleDoneClick(){

  }

  renderDoneField() {
    return (
      <div className="card">
        <div className="card-body">
         <h2>Done</h2>
          <hr />
          <button
            className="form-control btn btn-primary"
            onClick={() => {
              this.handleDoneClick();
            }}
          >
            Done!
          </button>
        </div>
      </div>
    );
  }

  renderTutorial() {
    switch (this.state.step) {
      case "location":
        return this.renderLocationField();
      case "personal":
        return this.renderPersonalInfoField();
      case "interests":
        return this.renderInterestsField();
      case "done":
        return this.renderDoneField();
      default:
        return this.renderLocationField();
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="form-row">
              <div className="col-md-9">
                <h2>courter.io</h2>
              </div>
              <div className="col-md-3" />
            </div>
            <hr />
            {this.renderTutorial()}
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    chatList: state.chatList,
    chatData: state.chatData,
    profileuser: state.profileuser,
    usericebreakers: state.usericebreakers,
    geolocation: state.geolocation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setDistanceAndAge: setDistanceAndAge,
      setViewState: setViewState,
      setUserLocation: setUserLocation,
      setAllUserInfo: setAllUserInfo,
      setTutorial: setTutorial
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
