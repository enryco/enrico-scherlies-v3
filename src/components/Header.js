import React, { Component } from 'react'
import Logo from './Logo'
import _ from 'lodash'

class Header extends Component {
  state = {
    labels: {
      'project': 'projects',
      'gist': 'gists',
      'contact': 'contact'
    }
  }

  componentDidMount() {
    this.props.setContentOffset(this.header.clientHeight)
  }

  render() {

    return (
      <div className="es-header" ref={element => this.header = element} >
        <div className="es-header__logo" onClick={e => this.props.handleFilterClick('all')}>
          <Logo />
        </div>
        <div className="es-header__title-wrapper">

          <div className="es-header__title">
            <div className="es-header__filter-item" onClick={e => this.props.handleFilterClick('all')} >
              <div>
                filter:
              </div>
            </div>
            {
              _.map(this.props.categories, (category, key) => <FilterItem
                key={key}
                category={category}
                label={category && this.state.labels[category] || category}
                handleFilterClick={this.props.handleFilterClick}
                isActive={this.props.filter === category}
              />)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Header


const FilterItem = props => (<div
  className={`es-header__filter-item ${props.isActive ? 'es-header__filter-item--active' : null}`}
  onClick={e => props.handleFilterClick(props.category)} >
  <div>
    {'  ' + props.label}
  </div>
</div>)
