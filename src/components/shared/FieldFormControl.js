import React from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const FieldFormControl = ({ input, type, disabled, placeholder, label, meta }) => {
  return (
    <FormGroup controlId={input.name} validationState={validationState(meta.visited, meta.invalid)}>
      {label && <ControlLabel>{label}</ControlLabel>}
      <FormControl
        type={type}
        placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
        onFocus={input.onFocus}
        disabled={disabled}
      />
      <FormControl.Feedback />
    </FormGroup>
  )
}

const validationState = (touched, invalid) => {
  if (!touched) return null
  if (touched && invalid) return 'error'
  return 'success'
}

export default FieldFormControl
