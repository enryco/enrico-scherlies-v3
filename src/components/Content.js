import React, { Component } from 'react'
import _ from 'lodash'


class Content extends Component {

  state = {}

  render() {
    const {
      posts,
      wpCategoryNames
    } = this.props


    return (
      <div className="es-content">
        {
          _.map(posts, (post, key) => {
            // TOOD logic to handle different psot types
            console.log(post)

            return <Entry
              key={key}
              title={post.title.rendered}
              type={wpCategoryNames[post.categories[0]]}
              content={post.content.rendered}
            />
          })
        }
      </div>
    )
  }
}

export default Content


const Entry = props => (<div className="es-entry">
  <div className="es-entry__title">{props.title}
    <span className="es-entry__subtitle">
      {' ' + props.type}
    </span>
  </div>
  <div className="es-entry__content" dangerouslySetInnerHTML={{ __html: props.content }}>
  </div>
</div>)
