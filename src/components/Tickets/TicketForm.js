import React from 'react'
import FieldFormControl from '../shared/FieldFormControl'
import { I18n, Translate } from 'react-redux-i18n'
import { required } from '../../actions/Validations'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, Button } from 'react-bootstrap'
import ErrorMessages from '../shared/ErrorMessages'

const TicketForm = ({ isFetching, handleSubmit, isFormInvalid, action, errorMessages }) => {
  return (
    <form onSubmit={handleSubmit}>
      <ErrorMessages messages={errorMessages} />
      <Field
        name="title"
        component={FieldFormControl}
        type="text"
        placeholder={I18n.t('tickets.title')}
        validate={[required]}
        disabled={isFetching}
      />
      <Field
        name="description"
        component={FieldFormControl}
        type="text"
        componentClass="textarea"
        placeholder={I18n.t('tickets.description')}
        validate={[required]}
        disabled={isFetching}
      />
      <FormGroup>
        <Button
          type="submit"
          bsStyle='success'
          style={{ width: '100%' }}
          disabled={isFetching || isFormInvalid}
        >
          <Translate value={action} />
        </Button>
      </FormGroup>
    </form>
  )
}

export default reduxForm({
  form: 'ticket'
})(TicketForm)
