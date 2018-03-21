import React, { Component } from 'react'
import Logo from './Logo'


class Header extends Component {

  state = {}

  render() {

    return (
      <div className="es-header">
        <div className="es-header__logo" >
          <Logo />
        </div>
        <div className="es-header__title">filter:</div>
      </div>
    )
  }
}

export default Header
