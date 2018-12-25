import React from 'react'
import { render, hydrate } from 'react-dom'
import './style/index.css'
import App from './components/App'
import { unregister } from './registerServiceWorker'

const rootElement = document.getElementById("root")

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}

unregister()
