import React from 'react'

const TicketItem = ({ title, description, author }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{`${author.name} <${author.email}>`}</p>
      <hr />
    </div>
  )
}

export default TicketItem
