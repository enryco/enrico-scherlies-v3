import React, { Component } from 'react';
import request from 'request'
import Header from './Header'
import Content from './Content'
import _ from 'lodash'

import content from '../assets/content'

class App extends Component {

  state = {
    projects: content.entries,
    showOnly: 0,
  }

  componentDidMount() {

  }

  handlePosts = () => {
    const state = { ...this.state }

    let posts = []
    posts = _.concat(posts, state.projects)

    // filter for date
    posts = _.reverse(_.sortBy(posts, 'date'))

    return posts
  }

  render() {
    const posts = this.handlePosts()

    return (
      <div className="App">
        <Header />
        {
          posts && <Content
            posts={posts}
          />
        }
      </div>
    );
  }
}

export default App;

