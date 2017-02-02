import React from 'react'
import { mount } from 'enzyme'
import LoginPage from '../../../src/components/Sessions/LoginPage'

import { Button } from 'react-bootstrap'

const setup = () => {
  const props = {
    email: '',
    isFetching: false,
    errorMessage: null,
    onEmailChange: jest.fn(),
    onFormSubmit: jest.fn()
  }

  const enzymeWrapper = mount(<LoginPage {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('LoginPage component', () => {
  describe('with authenticated user', () => {
    const { props, enzymeWrapper } = setup()

    it('should be rendered', () => {
      expect(enzymeWrapper.find('Button').length).toEqual(2)

      const form = enzymeWrapper.find('form')
      form.props().onSubmit({
        preventDefault: jest.fn()
      })
      expect(props.onFormSubmit.mock.calls.length).toBe(1)
    })
  })
})
