import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setDistanceAndAge,
  setViewState,
  setUserLocation
} from "../../actions/index";
import { bindActionCreators } from "redux";
import "../../style/profile.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agemax: this.props.auth.settings.agemax,
      agemin: this.props.auth.settings.agemin,
      distance: this.props.auth.settings.distance
    };
  }

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
  }

  handleLocationUpdate() {
    const locationData = {
      user_id: this.props.auth._id,
      latitude: this.props.geolocation.latitude,
      longitude: this.props.geolocation.longitude
    };
    this.props.setUserLocation(locationData);
  }
  renderIceBreakerSettings() {
    return (
      <div>
        <div className="form-row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                My location:
                <br />
                {this.props.auth.location.neighborhood}
                <br />
                <br />
                <button
                  className="btn btn-outline-primary form-control"
                  onClick={() => {
                    this.handleLocationUpdate();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
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
                <br />
                <button
                  className="form-control btn btn-outline-primary"
                  onClick={() => {
                    this.handleIceBreakerButtonClick();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return this.renderIceBreakerSettings();
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
      setUserLocation: setUserLocation
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
