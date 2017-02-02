import headers from './headers'
import * as constants from '../constants/pdfReport'

const getInfoRequest = () => {
  return {
    type: constants.FETCH_PDF_REPORT
  }
}

const getInfoSuccess = (url) => {
  return {
    type: constants.FETCH_PDF_REPORT,
    status: 'success',
    url
  }
}

const getInfoFailure = () => {
  return {
    type: constants.FETCH_PDF_REPORT,
    status: 'failure'
  }
}

export const getInfo = () => {
  return (dispatch) => {
    dispatch(getInfoRequest())
    fetch(`${process.env.API_HOST}/api/v1/pdf_reports/info.json`, {
      headers: headers()
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok && json.url) {
        dispatch(getInfoSuccess(`${process.env.API_HOST}${json.url}`))
      }
      else
        dispatch(getInfoFailure())
    }).catch(() => dispatch(getInfoFailure()))
  }
}

export const generate = () => {
  return (dispatch) => {
    dispatch(getInfoRequest())
    fetch(`${process.env.API_HOST}/api/v1/pdf_reports/generate.json`, {
      method: 'POST',
      headers: headers()
    }).then(() => {
      dispatch(getInfoFailure())
    }).catch(() => dispatch(getInfoFailure()))
  }
}
