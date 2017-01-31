import React from 'react'
import { Button } from 'react-bootstrap'

const TicketItem = ({ id, title, description, author, onDestroy, page }) => {
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
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{`${author.name} <${author.email}>`}</p>
      <hr />
    </div>
  )
}

export default TicketItem
