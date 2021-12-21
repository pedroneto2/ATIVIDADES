import React, { Component } from "react";
import Tweets from "../Tweets";
import { Route, withRouter } from "react-router-dom";
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  handleUser = (e) => {
    this.setState({ userName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/tweets");
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="tweets-analysis-container"
        id="input-form"
      >
        <p className="tweets-analysis-service">Tweets Analysis Service </p>
        <input
          id="input-box"
          className="username-input-box"
          type="text"
          placeholder="enter your username"
          value={this.state.userName}
          onChange={(e) => this.handleUser(e)}
        />
        <button className="submit-button">SUBMIT</button>
        <Route
          exact
          path="/tweets"
          render={() => <Tweets userName={this.state.userName} />}
        />
      </form>
    );
  }
}

export default withRouter(App);
