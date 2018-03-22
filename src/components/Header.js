import React, { Component } from 'react'
import Logo from './Logo'
import _ from 'lodash'

class Header extends Component {

  state = {
    categories: [
      'projects',
      'gists',
      'contact'
    ]
  }

  render() {

    return (
      <div className="es-header">
        <div className="es-header__logo" >
          <Logo />
        </div>
        <div className="es-header__title-wrapper">

          <div className="es-header__title">
            <div>
              filter:
          </div>
            {
              _.map(this.state.categories, (category, key) => <FilterItem key={key} text={category} />)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Header


const FilterItem = props => (<div className="es-header__filter-item" onClick={() => console.log('clicked')} >
  <div>
    {'  ' + props.text}
  </div>
</div>)
