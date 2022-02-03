import { FormikTouched, FormikValues } from "formik"
import { TFunction } from "i18next"
import validator from "validator"

export const ValidForm = {}

export const ValidField = undefined

export type ValidationResult = string | undefined

export type FieldTouched = FormikTouched<unknown> | undefined

export type Validate = (value: string, t: TFunction) => string

export const validate = (next: () => ValidationResult, touched: FieldTouched) => {
  if (!touched) return ValidField
  return next()
}

/**
 * A form error message should only be displayed after the input
 * field has been "touched"
 */
export const validationError = (errorMessage: unknown | undefined, touched: FieldTouched) => {
  return touched ? (errorMessage as string) : undefined
}

/**
 * Removed all undefined keys from FormikValues, a form is considered
 * valid when it receives an empty object.
 */
export const validationResult = (values: FormikValues) => {
  Object.keys(values).forEach((key) => {
    if (values[key] === undefined) {
      delete values[key]
    }
  })
  return values
}

export type ValidationDeps = {
  validIban: (value: string) => boolean
  validSwissPhoneNumber: (value: string) => boolean
  validSwissMobile: (value: string) => boolean
  validEmail: (value: string) => boolean
  invalidPassword: (value: string) => boolean
  validNumber: (value: string) => boolean
}

const validationDeps = (): ValidationDeps => {
  const IBAN_REGEX = /^[A-Z]{2}\d{2}( ?[A-Z0-9]){11,28}/
  const SWISS_PHONE_NUMBER_REGEX = /^(?:(?:0041)|(?:\+41)|(?:41))?[0]?[0-9]{9}$/
  const SWISS_MOBILE_NUMBER_REGEX = /^(?:(?:0041)|(?:\+41)|(?:41))?[0]?7[5-9][0-9]{7}$/
  const HAS_AT_LEAST_ONE_UPPER_CASE_CHAR = /[A-Z]/
  const HAS_AT_LEAST_ONE_LOWER_CASE_CHAR = /[a-z]/
  const HAS_AT_LEAST_ONE_DIGIT = /\d/
  const HAS_SPECIAL = /[^a-zA-Z0-9]/
  const stripSpaces = (value: string) => value.replace(/\s/gm, "")

  return {
    validIban: (value: string) => IBAN_REGEX.test(stripSpaces(value)),
    validSwissPhoneNumber: (value: string) => SWISS_PHONE_NUMBER_REGEX.test(stripSpaces(value)),
    validSwissMobile: (value: string) => SWISS_MOBILE_NUMBER_REGEX.test(stripSpaces(value)),
    validEmail: (value: string) => validator.isEmail(value),
    invalidPassword: (value: string) =>
      !value ||
      value.length < 8 ||
      value.search(HAS_AT_LEAST_ONE_UPPER_CASE_CHAR) === -1 ||
      value.search(HAS_AT_LEAST_ONE_LOWER_CASE_CHAR) === -1 ||
      value.search(HAS_AT_LEAST_ONE_DIGIT) === -1 ||
      value.search(HAS_SPECIAL) === -1,
    validNumber: (value: string) => validator.isNumeric(value),
  }
}

export const VALIDATION_DEPS = validationDeps()
