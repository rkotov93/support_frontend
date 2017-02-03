import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { Translate } from 'react-redux-i18n'
import * as roles from '../../constants/roles'
import * as statuses from '../../constants/tickets'

const TicketItem = ({ id, title, description, author, status, onDestroy, page, role, start, resolve, filter }) => {
  return (
    <div className="ticket-item">
      <Button
        className='close'
        onClick={() => {
          onDestroy(id, page, { filter: filter })
        }}
      >
        <span aria-hidden='true'>&times;</span>
      </Button>
      <h3 className="title">
        <Link to={`/tickets/${id}`}>{title}</Link>&nbsp;
        <i className="status" style={{ fontSize: '17px' }}><Translate value={`tickets.statuses.${status}`} /></i>
      </h3>
      <p className="description">{description}</p>
      <p>{`${author.name}`} <i>{`<${author.email}>`}</i></p>

      {(role === roles.SUPPORT || role === roles.ADMIN) && renderEventButtons(status, start, resolve)}

      {
        (role === roles.CUSTOMER || role === roles.ADMIN) && status !== 'solved' &&
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

const renderEventButtons = (status, start, resolve) => {
  return (
    <span>
      {
        status === statuses.NEW &&
          <Button
            style={{ marginRight: '5px' }}
            bsStyle="warning"
            onClick={() => {
              start()
            }}
          >
            <Translate value="tickets.start" />
          </Button>
      }
      {
        (status === statuses.NEW || status === statuses.IN_PROGRESS) &&
          <Button
            style={{ marginRight: '5px' }}
            bsStyle="success"
            onClick={() => {
              resolve()
            }}
          >
            <Translate value="tickets.resolve" />
          </Button>
      }
    </span>
  )
}

export default TicketItem
