import validator from "validator"
import { TFunction } from "i18next"
import { validationResult, ValidField } from "../Shared.Validation"
import { FormikErrors } from "formik"
import { AuthLoginValues } from "./AuthLogin.Component"

export function validateAuth(values: AuthLoginValues, t: TFunction): FormikErrors<AuthLoginValues> {
  return validationResult({
    emailAddress: validateEmailAddress(values, t),
    password: validatePassword(values, t),
  })
}

const validateEmailAddress = (values: AuthLoginValues, t: TFunction) => {
  if (!values.emailAddress) {
    return t("shared:validation.mandatory", {
      field: t("login.field.emailAddress"),
    })
  }
  if (!validator.isEmail(values.emailAddress)) {
    return t("shared:validation.valid.email")
  }
  return ValidField
}

const validatePassword = (values: AuthLoginValues, t: TFunction) => {
  if (!values.password) {
    return t("shared:validation.mandatory", {
      field: t("login.field.password"),
    })
  }
  if (values.password.length < 8) {
    return t("shared:validation.length", {
      field: t("login.field.password"),
      length: 8,
    })
  }
  return ValidField
}
