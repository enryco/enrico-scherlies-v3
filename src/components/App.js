import React, { Component } from 'react';
import request from 'request'
import Header from './Header'
import Content from './Content'
import _ from 'lodash'
import firebaseApp from '../firebase';

class App extends Component {

  state = {
    projects: [],
    gists: null,
    showOnly: 0,
    categories: [
      'news',
      'project',
      'gist',
      'about'
    ],
    filter: 'all',
    contentOffset: 0,
  }

  componentDidMount() {

    firebaseApp.database().ref().once('value').then(snap => {
      const data = snap.val()
      if (data) {
        const projects = _.map(data.posts, post => post.fields)
        this.setState({ projects })
      }
    })

    const options = {
      url: 'https://api.github.com/users/enryco/gists',
      headers: {
        'User-Agent': 'request'
      }
    }
    request(options, (error, response, body) => {
      if (body) {
        const gistsRaw = JSON.parse(body)
        const gists = _.map(gistsRaw, gist => this.formatGists(gist))
        this.setState({ gists })
      }

    })
  }

  formatGists = (gist) => {
    const title = _.get(_.get(gist.files, _.keys(gist.files)[0]), 'filename')
    const content = `
      <div>${gist.description}</div>
      <div><a href="${gist.html_url}">Read more</a></div>
    `
    const date = gist.updated_at

    return {
      title,
      date,
      type: 'gist',
      content,
    }
  }

  handlePosts = () => {
    const state = { ...this.state }

    let posts = []
    posts = _.concat(posts, state.projects)
    posts = _.concat(posts, state.gists)

    // filter
    if (state.filter !== 'all') {
      posts = _.filter(posts, post => post.type === state.filter)
    }

    // sort date
    posts = _.reverse(_.sortBy(posts, 'date'))

    return posts
  }

  handleFilterClick = filter => {
    this.setState({ filter })
  }

  render() {
    const posts = this.handlePosts()
    return (
      <div className="es-app">
        <Header
          categories={this.state.categories}
          filter={this.state.filter}
          handleFilterClick={this.handleFilterClick}
          setContentOffset={contentOffset => this.setState({ contentOffset })}
        />
        {
          posts && <Content
            contentOffset={this.state.contentOffset}
            posts={posts}
          />
        }
      </div>
    );
  }
}

export default App;

