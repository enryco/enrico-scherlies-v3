import React from 'react'
import logo from '../assets/logo-mini.svg'


const Logo = props => {

  const { img } = props
  return (
    <div
      style={{ height: 50, width: 65}}
      className="es-logo">
      <img
        className="es-logo__img"
        src={logo}
        alt="" />
    </div>
  )
}

export default Logo
