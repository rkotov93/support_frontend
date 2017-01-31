import React from 'react'
import { Button, Panel, Pagination } from 'react-bootstrap'
import { Translate } from 'react-redux-i18n'
import { Link } from 'react-router'
import TicketItem from './TicketItem'
import ErrorMessages from '../shared/ErrorMessages'

const TicketsList = ({ tickets, pagination, turnPage, onDestroy, errorMessages, role }) => {
  const header = (
    <h3 style={{ fontSize: '35px', fontWeight: 'bold' }}>
      <Translate value="tickets.title" />
      <Link to="/tickets/new">
        <Button bsStyle="primary" className="pull-right">
          <Translate value="tickets.newTicket" />
        </Button>
      </Link>
    </h3>
  )

  return (
    <Panel id="tickets_panel" header={header}>
      <ErrorMessages messages={errorMessages} />
      {renderedTicketsItems(tickets, onDestroy, pagination.page, role)}
      {
        tickets.length > 0 &&
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={pagination.totalPages}
            maxButtons={5}
            activePage={pagination.page || 1}
            onSelect={turnPage} />
      }
    </Panel>
  )
}

const renderedTicketsItems = (tickets, onDestroy, page, role) => {
  if (tickets.length === 0)
    return (
      <div>
        <b><Translate value="tickets.noItems" /></b>
      </div>
    )
  else
    return (
      <div>
        {
          tickets.map(ticket => (
            <TicketItem
              key={`ticket_${ticket.id}`}
              page={page}
              onDestroy={onDestroy}
              role={role}
              {...ticket}
            />
          ))
        }
      </div>
    )
}

export default TicketsList
