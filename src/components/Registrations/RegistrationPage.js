import React from 'react'
import { Translate, I18n } from 'react-redux-i18n'

import { Grid, Row, Col, Panel, FormGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router'

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
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onFormSubmit(emailInput.value, passwordInput.value)
                }}
              >
                {errorHandler(errorMessage)}
                <FormGroup>
                  <FormControl
                    inputRef={node => emailInput = node}
                    type="text"
                    placeholder={I18n.t('users.email')}
                    name="user[email]"
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
                    name="user[password]"
                    disabled={isFetching}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    bsStyle='success'
                    style={{ width: '100%' }}
                    disabled={isFetching}
                  >
                    <Translate value="sessions.login" />
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Link to='/registration'>
                    <Button
                      bsStyle='primary'
                      style={{ width: '100%' }}
                      disabled={isFetching}
                    >
                      <Translate value="registrations.register" />
                    </Button>
                  </Link>
              </FormGroup>
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
