import React from 'react'
import { Translate, I18n } from 'react-redux-i18n'

import { Field, reduxForm } from 'redux-form'
import { FormGroup, Button } from 'react-bootstrap'
import FieldFormControl from '../shared/FieldFormControl'
import * as validations from '../../actions/Validations'
import { Link } from 'react-router'

let RegistrationForm = ({ password, isFetching, isFormInvalid, handleSubmit, errorMessages }) => {
  return (
    <form onSubmit={handleSubmit}>
      {errorMessages && showErrors(errorMessages)}
      <Field
        name="email"
        component={FieldFormControl}
        type="email"
        placeholder={I18n.t('users.email')}
        validate={[validations.required, validations.email]}
        disabled={isFetching}
      />
      <Field
        name="name"
        component={FieldFormControl}
        type="text"
        placeholder={I18n.t('users.name')}
        validate={validations.required}
        disabled={isFetching}
      />
      <Field
        name="password"
        component={FieldFormControl}
        type="password"
        placeholder={I18n.t('users.password')}
        validate={[validations.required, validations.minLength(6)]}
        disabled={isFetching}
      />
      <Field
        name="passwordConfirmation"
        component={FieldFormControl}
        type="password"
        placeholder={I18n.t('users.password_confirmation')}
        validate={[
          validations.required,
          validations.minLength(6),
          validations.passwordMatch(password)
        ]}
        disabled={isFetching}
      />
      <FormGroup>
        <Button
          type="submit"
          bsStyle='success'
          style={{ width: '100%' }}
          disabled={isFetching || isFormInvalid}
        >
          <Translate value="registrations.register" />
        </Button>
      </FormGroup>
      <FormGroup>
        <Link to='/login'>
          <Button
            bsStyle='primary'
            style={{ width: '100%' }}
            disabled={isFetching}
          >
            <Translate value="sessions.login" />
          </Button>
        </Link>
      </FormGroup>
    </form>
  )
}

const showErrors = (messages) => {
  return (
    <ul>
      {
        messages.map((message, index) => {
          return (<li style={{ color: 'red' }} key={`error_${index}`}>{message}</li>)
        })
      }
    </ul>
  )
}

RegistrationForm = reduxForm({
  form: 'registration'
})(RegistrationForm)

export default RegistrationForm
