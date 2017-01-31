import { I18n } from 'react-redux-i18n'

export const required = value => value ? undefined : I18n.t('validations.required')

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? I18n.t('validations.invalidEmail') : undefined

export const minLength = min => value =>
  value && value.length < min ? I18n.t('validations.minLength') : undefined

export const passwordMatch = password => value => {
  return value == password ? undefined : I18n.t('validations.passwordMatch')
}
