import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { Translate } from 'react-redux-i18n'
import * as roles from '../../constants/roles'

const TicketItem = ({ id, title, description, author, status, onDestroy, page, role }) => {
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
      <p>{`${author.name}`} <i>{`<${author.email}>`}</i></p>
      {
        (role === roles.CUSTOMER || role === roles.ADMIN) &&
          <Link to={`/tickets/${id}/edit`}>
            <Button bsStyle="primary">
              <Translate value="tickets.edit" />
            </Button>
          </Link>
      }
      <hr />
    </div>
  )
}

export default TicketItem
