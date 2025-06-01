import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Options = () => {
  return (
    <div className="options-container">
      <h1>Options Page</h1>
      <p>This is the options page for the extension.</p>
      <p>Here you can configure settings and preferences.</p>
      <label>
        <input type="checkbox" />
        Enable Feature X
      </label>
      <br />
      <label>
        <input type="checkbox" />
        Enable Feature Y
      </label>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
)
