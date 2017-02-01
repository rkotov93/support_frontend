import React from 'react'
import ErrorMessages from '../shared/ErrorMessages'
import { Translate, I18n } from 'react-redux-i18n'
import { Pagination, FormControl, Button } from 'react-bootstrap'
import * as roles from '../../constants/roles'

const UsersList = ({ users, errorMessages, pagination, turnPage, changeRole, onDestroy }) => {
  return (
    <div>
      <h3>Users List</h3>
      <ErrorMessages messages={errorMessages} />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th><Translate value="users.name" /></th>
            <th><Translate value="users.email" /></th>
            <th><Translate value="users.role" /></th>
            <th><Translate value="actions" /></th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return (
                <tr key={`user_${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{roleSelector(user, changeRole)}</td>
                  <td>
                    <Button
                      onClick={() => {
                        onDestroy(user.id, pagination.page)
                      }}
                    >
                      <Translate value="delete" />
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        users.length > 0 &&
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
    </div>
  )
}

const roleSelector = (user, changeRole) => {
  return (
    <FormControl
      componentClass="select"
      value={user.role}
      onChange={(e) => {
        changeRole(user.id, e.target.value)
      }}
    >
      <option value={roles.CUSTOMER}>{I18n.t(`users.roles.${roles.CUSTOMER}`)}</option>
      <option value={roles.SUPPORT}>{I18n.t(`users.roles.${roles.SUPPORT}`)}</option>
      <option value={roles.ADMIN}>{I18n.t(`users.roles.${roles.ADMIN}`)}</option>
    </FormControl>
  )
}

export default UsersList
