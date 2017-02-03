import React from 'react'
import { mount } from 'enzyme'
import TicketsList from '../../../src/components/Tickets/TicketsList'

import { Button } from 'react-bootstrap'

const setup = (options = {}) => {
  const props = {
    tickets: [{
      title: 'Ticket title',
      description: 'Ticket description',
      status: options.status || 'new',
      author: {
        name: 'Author name',
        email: 'author@email.com'
      }
    }],
    pagination: {
      page: 1,
      totalPages: 1,
      totalCount: 1
    },
    turnPage: jest.fn(),
    onDestroy: jest.fn(),
    errorMessages: options.errorMessages,
    role: options.role || 'customer',
    start: jest.fn(),
    resolve: jest.fn(),
    filter: options.filter || 'all',
    changeFilter: jest.fn()
  }

  const enzymeWrapper = mount(<TicketsList {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('TicketsList component', () => {
  describe('without errors', () => {
    const { props, enzymeWrapper } = setup()

    it('should be rendered', () => {
      expect(enzymeWrapper.find('h3.title').text()).toContain('Ticket title')
      expect(enzymeWrapper.find('p.description').text()).toContain('Ticket description')
      expect(enzymeWrapper.find('i.status').text()).toContain('New')
      expect(enzymeWrapper.find('button.close').length).toEqual(1)
    })
  })

  describe('with errors', () => {
    const { props, enzymeWrapper } = setup({ errorMessages: ['Everything is broken'] })

    it('should contain error message', () => {
      expect(enzymeWrapper.find('ul.errors-list').text()).toContain('Everything is broken')
    })
  })
})
