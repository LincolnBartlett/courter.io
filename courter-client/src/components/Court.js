import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchTopics } from "../actions/index";
import { bindActionCreators } from "redux";

class Court extends Component {

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
                                <a key={category._id}
                                onClick={() => this.props.fetchTopics(category._id)} >{category.title}</a>
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
                    <ul>
                        {this.props.topics.map(topic => {
                            return (<li key={topic._id}>
                                        {topic.title}
                                </li>);
                        })}
                    </ul>
                        </div>);
        }
    }

  render() {
    return (<div className="card-body">
            {this.renderCategories()}
            <hr/>
            {this.renderTopics()}
          </div>);
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    topics: state.topics
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCategories: fetchCategories,
      fetchTopics: fetchTopics
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
