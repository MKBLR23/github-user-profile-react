/* eslint-disable array-callback-return */
import React, { Component } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Profile from "./components/Profile";

import "./App.css";

class App extends Component {
  state = {
    profile: {},
    userRepos: [],
  };

  componentDidMount = () => {
    this.getUserInfo();
    const profileJson = localStorage.getItem("profile");
    const reposJson = localStorage.getItem("repos");
    const profile = JSON.parse(profileJson);
    this.setState({ profile, reposJson });
  };

  componentDidUpdate = () => {
    const profile = JSON.stringify(this.state.profile);
    const repos = JSON.stringify(this.state.repos);
    localStorage.setItem("profile", profile);
    localStorage.setItem("repos", repos);
  };

  getUserInfo = async (e) => {
    const username = e ? e.target.elements.username.value : "MKBLR";
    e && e.preventDefault();
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    this.setState({ profile: data });

    const repoRequest = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const repoData = await repoRequest.json();
    this.setState({ userRepos: repoData });
  };

  render() {
    const repos = this.state.userRepos;
    repos && repos.map((repo) => {});
    return (
      <div className="App">
        <div className="App-Wrapper">
          <Header />
          <Form getUserInfo={this.getUserInfo} />
          <div className="user-profile-wrapper">
            <Profile profile={this.state.profile} />
          </div>
          {repos && (
            <React.Fragment>
              {repos.map((repo) => {
                return (
                <div className="github-cards" key={repo.id}>
                  <a
                    href={`https://github.com/repo/${repo.id}`}
                    className="github-card"
                    data-github="Nexmo/nexmo-ruby"
                  >
                    <h3>{repo.name}</h3>
                    <span className="github-card__meta">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <span data-stars>
                        <i className="fa fa-spinner" aria-hidden="true"></i>
                      </span>
                    </span>
                    <span className="github-card__meta">
                      <i className="fa fa-code-fork" aria-hidden="true"></i>
                      <span data-forks>
                        <i className="fa fa-spinner" aria-hidden="true"></i>
                      </span>
                    </span>
                  </a>
                </div>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
