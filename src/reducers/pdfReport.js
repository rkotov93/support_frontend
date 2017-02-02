import * as constats from '../constants/pdfReport'

const initialState = {
  url: null
}

const pdfReport = (state = initialState, action) => {
  switch (action.type) {
  case constats.FETCH_PDF_REPORT:
    return fetchPdfReport(state, action)
  default:
    return state
  }
}

const fetchPdfReport = (state, action) => {
  switch (action.status) {
  case 'success':
    return {
      url: action.url
    }
  case 'failure':
    return initialState
  default:
    return state
  }
}

export default pdfReport
