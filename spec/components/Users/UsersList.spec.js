import React from 'react'
import { mount } from 'enzyme'
import UsersList from '../../../src/components/Users/UsersList'

import { Button } from 'react-bootstrap'

const setup = (options = {}) => {
  const props = {
    users: [{
      id: 1,
      name: 'User name',
      email: 'user@email.com',
      role: options.role || 'customer'
    }],
    errorMessages: options.errorMessages,
    pagination: {
      page: 1,
      totalPages: 1,
      totalCount: 1
    },
    turnPage: jest.fn(),
    changeRole: jest.fn(),
    onDestroy: jest.fn()
  }

  const enzymeWrapper = mount(<UsersList {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('UsersLst component', () => {
  describe('without errors', () => {
    const { props, enzymeWrapper } = setup()

    it('should be rendered', () => {
      expect(enzymeWrapper.find('td.id').text()).toContain('1')
      expect(enzymeWrapper.find('td.name').text()).toContain('User name')
      expect(enzymeWrapper.find('td.email').text()).toContain('user@email.com')
    })
  })

  describe('with errors', () => {
    const { props, enzymeWrapper } = setup({ errorMessages: ['Everything is broken'] })

    it('should contain error message', () => {
      expect(enzymeWrapper.find('ul.errors-list').text()).toContain('Everything is broken')
    })
  })
})
