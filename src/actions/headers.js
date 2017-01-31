import { AUTH } from '../constants/sessions'

const headers = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTH)).jwt}`
  }
}

export default headers
