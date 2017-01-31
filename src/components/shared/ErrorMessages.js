import React from 'react'

const ErrorMessages = ({ messages }) => {
  if (messages && messages.length !== 0)
    return (
      <ul>
        {
          messages.map((message, index) => {
            return (<li style={{ color: 'red' }} key={`error_${index}`}>{message}</li>)
          })
        }
      </ul>
    )
  else
    return null
}

export default ErrorMessages
