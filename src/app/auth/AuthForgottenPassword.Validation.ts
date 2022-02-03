import validator from "validator"
import { TFunction } from "i18next"
import { FormikErrors } from "formik"
import { validationResult, ValidField } from "../Shared.Validation"
import { AuthForgottenPasswordValues } from "./AuthForgottenPassword.Component"

export function validateForgottenPassword(
  values: AuthForgottenPasswordValues,
  t: TFunction,
): FormikErrors<AuthForgottenPasswordValues> {
  return validationResult({
    emailAddress: validateEmailAddress(values, t),
  })
}

const validateEmailAddress = (values: AuthForgottenPasswordValues, t: TFunction) => {
  if (!values.emailAddress) {
    return t("shared:validation.mandatory", {
      field: t("forgotten-password.field.email"),
    })
  }
  if (!validator.isEmail(values.emailAddress)) {
    return t("shared:validation.valid.email")
  }
  return ValidField
}
