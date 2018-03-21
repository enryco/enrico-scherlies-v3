import React, { Component } from 'react';
import request from 'request'
import Header from './Header'
import Content from './Content'
import _ from 'lodash'

class App extends Component {

  state = {
    wpCategories: [],
    wpCategoryNames: null,
    wpPosts: [],
    showOnly: 0,
  }

  componentDidMount() {
    request('http://enricoscherlies.de/wp/wp-json/wp/v2/categories', {}, (error, response, body) => {
      const wpCategories = JSON.parse(body)
      const wpCategoryNames = {}
      _.forEach(wpCategories, category => {
        wpCategoryNames[category.id] = category.name
      })
      this.setState({ wpCategories, wpCategoryNames })
    })

    request('http://enricoscherlies.de/wp/wp-json/wp/v2/posts', {}, (error, response, body) => {
      const wpPosts = JSON.parse(body)
      this.setState({ wpPosts })
    })
  }

  handlePosts = () => {
    const state = { ...this.state }

    let posts = []
    posts = _.concat(posts, state.wpPosts)

    // filter for date
    posts = _.reverse(_.sortBy(posts, 'date'))

    return posts
  }

  render() {
    const { wpCategoryNames } = this.state
    const posts = this.handlePosts()

    console.log(wpCategoryNames)


    return (
      <div className="App">
        <Header />
        {
          posts && wpCategoryNames && <Content
            posts={posts}
            wpCategoryNames={wpCategoryNames}
          />
        }
      </div>
    );
  }
}

export default App;

