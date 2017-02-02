import React from 'react'
import { mount } from 'enzyme'
import TicketsList from '../../../src/components/Tickets/TicketsList'

import { Button } from 'react-bootstrap'

const setup = () => {
  const props = {
    tickets: [],
    pagination: {
      page: 1,
      totalPages: 1,
      totalCount: 1
    },
    turnPage: jest.fn(),
    onDestroy: jest.fn(),
    errorMessages: null,
    role: 'admin',
    start: jest.fn(),
    resolve: jest.fn(),
    filter: 'all',
    changeFilter: jest.fn()
  }

  const enzymeWrapper = mount(<TicketsList {...props} />)

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

      // const form = enzymeWrapper.find('form')
      // form.props().onSubmit({
      //   preventDefault: jest.fn()
      // })
      // expect(props.onFormSubmit.mock.calls.length).toBe(1)
    })
  })
})
