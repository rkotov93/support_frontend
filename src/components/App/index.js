import '../../stylesheets/application.scss'

import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Navigation from './Navigation'

const App = ({ main }) => {
  return (
    <div id="application">
      <Navigation />
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            {main}
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default App
