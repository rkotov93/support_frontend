import React from 'react'
import { Translate } from 'react-redux-i18n'

import { Grid, Row, Col, Panel } from 'react-bootstrap'
import RegistrationForm from '../../containers/RegistrationForm'

const RegistrationPage = () => {
  const header = (
    <h3><Translate value="registration.registration" /></h3>
  )

  return (
      <Grid fluid={true}>
        <Row>
          <Col mdOffset={3} md={6}>
            <Panel header={header}>
              <RegistrationForm />
            </Panel>
          </Col>
        </Row>
      </Grid>
  )
}

export default RegistrationPage
