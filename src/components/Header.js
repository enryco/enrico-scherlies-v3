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
            <span className="es-header__filter-item">show:</span>
            <FilterItem
              key={0}
              category={'all'}
              label={'all'}
              handleFilterClick={this.props.handleFilterClick}
              isActive={this.props.filter === 'all'}
            />
            {
              _.map(this.props.categories, (category, key) => <FilterItem
                key={key}
                category={category}
                label={category && (this.state.labels[category] ? this.state.labels[category] : category)}
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


const FilterItem = props => (<div onClick={e => props.handleFilterClick(props.category)} >
  <div>
    <span className="es-header__filter-delim">{props.category === 'all' ? '' : '~'}</span>
    <span className={`es-header__filter-item ${props.isActive ? 'es-header__filter-item--active' : null}`}>
      {props.label}
    </span>
  </div>
</div>)
