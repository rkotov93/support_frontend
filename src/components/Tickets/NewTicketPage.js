import React from 'react'
import TicketForm from '../../components/Tickets/TicketForm'
import { Translate } from 'react-redux-i18n'
import { Grid, Row, Col, Panel } from 'react-bootstrap'

const NewTicketPage = (props) => {
  const header = (<h3><Translate value="tickets.newTicket" /></h3>)

  return (
    <Grid fluid={true}>
      <Row>
        <Col mdOffset={2} md={8}>
          <Panel header={header}>
            <TicketForm
              {...props}
              action="create"
            />
          </Panel>
        </Col>
      </Row>
    </Grid>
  )
}

export default NewTicketPage
