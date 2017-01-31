import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

const TicketItem = ({ id, title, description, author, status, onDestroy, page }) => {
  return (
    <div>
      <Button
        className='close'
        onClick={() => {
          onDestroy(id, page)
        }}
      >
        <span aria-hidden='true'>&times;</span>
      </Button>
      <h3><Link to={`/tickets/${id}`}>{title}</Link> <i style={{ fontSize: '17px' }}>{status}</i></h3>
      <p>{description}</p>
      <p>{`${author.name} <${author.email}>`}</p>
      <hr />
    </div>
  )
}

export default TicketItem
