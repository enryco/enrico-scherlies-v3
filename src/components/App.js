import React, { Component } from 'react';
import request from 'request'
import Header from './Header'
import Content from './Content'
import _ from 'lodash'

import content from '../assets/content'

class App extends Component {

  state = {
    projects: content.entries,
    gists: null,
    showOnly: 0,
    categories: [
      'project',
      'gist',
      'contact'
    ],
    filter: 'all',
    contentOffset: 0,
  }

  componentDidMount() {
    const options = {
      url: 'https://api.github.com/users/enryco/gists',
      headers: {
        'User-Agent': 'request'
      }
    }
    request(options, (error, response, body) => {
      console.log(body)
      if (body) {
        const gistsRaw = JSON.parse(body)
        const gists = _.map(gistsRaw, gist => this.formatGists(gist))
        console.log(gists)

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
      <div className="App">
        <Header
          categories={this.state.categories}
          filter={this.state.filter}
          handleFilterClick={this.handleFilterClick}
          setContentOffset={contentOffset => this.setState({contentOffset})}
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

