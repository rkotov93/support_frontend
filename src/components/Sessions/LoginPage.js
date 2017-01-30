import React from 'react'
import { Translate, I18n } from 'react-redux-i18n'

import { Grid, Row, Col, Panel, FormGroup, FormControl, Button } from 'react-bootstrap'

const LoginPage = ({ email, isFetching, errorMessage, onEmailChange, onFormSubmit }) => {
  const header = (
    <h3><Translate value="sessions.login" /></h3>
  )
  let emailInput = null
  let passwordInput = null
  return (
      <Grid fluid={true}>
        <Row>
          <Col mdOffset={3} md={6}>
            <Panel header={header}>
              <form>
                {errorHandler(errorMessage)}
                <FormGroup>
                  <FormControl
                    inputRef={node => emailInput = node}
                    type="text"
                    placeholder={I18n.t('users.email')}
                    onChange={() => onEmailChange(emailInput.value)}
                    defaultValue={email}
                    disabled={isFetching}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControl
                    inputRef={node => passwordInput = node}
                    type="password"
                    placeholder={I18n.t('users.password')}
                    disabled={isFetching}
                  />
                </FormGroup>
                <Button
                  bsStyle='primary'
                  style={{ width: '100%' }}
                  onClick={() => {
                    onFormSubmit(emailInput.value, passwordInput.value)
                  }}
                  disabled={isFetching}
                >
                  <Translate value="sessions.login" />
                </Button>
              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
  )
}

const errorHandler = (message) => {
  if (message)
    return (<p style={{ color: 'red' }}>{message}</p>)
}

export default LoginPage
