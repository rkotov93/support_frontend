import React from 'react'
import { Panel, Pagination } from 'react-bootstrap'
import { Translate } from 'react-redux-i18n'
import TicketItem from './TicketItem'
import ErrorMessages from '../shared/ErrorMessages'

const TicketsList = ({ tickets, pagination, turnPage, onDestroy, errorMessages }) => {
  const header = (
    <h3><Translate value="tickets.title" /></h3>
  )

  return (
    <Panel header={header}>
      <ErrorMessages messages={errorMessages} />
      {renderedTicketsItems(tickets, onDestroy, pagination.page)}
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

const renderedTicketsItems = (tickets, onDestroy, page) => {
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
              {...ticket}
            />
          ))
        }
      </div>
    )
}

export default TicketsList
