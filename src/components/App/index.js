import '../../stylesheets/application.scss'

import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Navigation from './Navigation'

const App = ({ main, name, role, logout, report, generateReport }) => {
  return (
    <div id="application">
      <Navigation
        name={name}
        role={role}
        logout={logout}
        report={report}
        generateReport={generateReport}
      />
      <Grid fluid={true}>
        <Row>
          <Col mdOffset={2} md={8}>
            {main}
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default App
