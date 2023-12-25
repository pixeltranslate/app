import { helpers, required, email } from '@vuelidate/validators'
import type { ValidationRule } from '@vuelidate/core'

type E = string | undefined
const DEFAULT_ENTITY = 'value'

const messages = {
  required: (e: E) => `Please enter a ${e ?? DEFAULT_ENTITY}.`,
  email: () => 'Please enter a valid email address.'
}

const validatorWithMessage = (message: string, validator: ValidationRule) => {
  return helpers.withMessage(message, validator)
}

const validators = {
  required: (e: E) => validatorWithMessage(messages.required(e), required),
  email: () => validatorWithMessage(messages.email(), email)
}

type ValidatorTypes = keyof typeof validators

const makeRule = (vali: ValidatorTypes[], entity: E) => {
  return vali.map((key) => {
    return validators[key](entity)
  })
}

export default () => {
  return {
    messages,
    validators,
    makeRule,
    validatorWithMessage
  }
}
