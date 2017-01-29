import '../../stylesheets/application.scss'

import React from 'react'
import Navigation from './Navigation'

const App = ({ main }) => {
  return (
    <div id="application§">
      <Navigation />
      {main}
    </div>
  )
}

export default App
