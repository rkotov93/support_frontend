import React from 'react'
import { Panel } from 'react-bootstrap'
import { Translate } from 'react-redux-i18n'
import TicketItem from './TicketItem'

const TicketsList = ({ tickets, onDestroy }) => {
  const header = (
    <h3><Translate value="tickets.title" /></h3>
  )

  return (
    <Panel header={header}>
      {renderedTicketsItems(tickets, onDestroy)}
    </Panel>
  )
}

const renderedTicketsItems = (tickets, onDestroy) => {
  if (tickets.length === 0)
    return (<b><Translate value="tickets.noItems" /></b>)
  else
    return (
      <div>
        {
          tickets.map(ticket => (
            <TicketItem
              key={`ticket_${ticket.id}`}
              onDestroy={onDestroy}
              {...ticket}
            />
          ))
        }
      </div>
    )
}

export default TicketsList
