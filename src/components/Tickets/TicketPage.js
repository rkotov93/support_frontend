import React from 'react'
import TicketItem from './TicketItem'
import { Translate } from 'react-redux-i18n'

const TicketPage = ({ id, title, description, status, author, onDestroy, page, isFetching, role }) => {
  if (isFetching)
    return (<p><Translate value="loading" /></p>)
  else
    return (
      <TicketItem
        id={id}
        title={title}
        description={description}
        status={status}
        author={author}
        page={page}
        role={role}
        onDestroy={onDestroy} />
    )
}

export default TicketPage
