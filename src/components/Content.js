import React, { Component } from 'react'
import _ from 'lodash'


class Content extends Component {

  render() {

    const { posts, contentOffset } = this.props

    return (
      <div className="es-content" style={{ paddingTop: contentOffset + 10 }}>
        {
          _.map(posts, (post, key) => {
            // TOOD logic to handle different psot types
            if (!post) return null

            return <Entry
              key={key}
              title={post.title}
              type={post.type}
              content={post.content}
              image={_.get(post, 'image.0.mediaLink')}
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
      {' —' + props.type}
    </span>
  </div>
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 2 }}>
      <div className="es-entry__content" dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
    {
      props.image &&
      <div style={{ flex: 1 }}>
        <img style={{ borderRadius: 0, width: "120px", float: "right", objectFit: 'contain' }} src={props.image} alt="" />
      </div>
    }
  </div>
</div>)
