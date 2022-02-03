import { TFunction } from "i18next"
import { FormikErrors } from "formik"
import { ValidationDeps, validationResult, ValidField } from "../Shared.Validation"
import { AuthNewAccountPasswordValues } from "./AuthNewAccountPassword.Component"

export function validateNewAccountPassword(
  values: AuthNewAccountPasswordValues,
  validationDeps: ValidationDeps,
  t: TFunction,
): FormikErrors<AuthNewAccountPasswordValues> {
  return validationResult({
    password: validatePassword(values.password, validationDeps, t),
    confirmPassword: validateConfirmPassword(values.confirmPassword, values.password, t),
  })
}

const validatePassword = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("newAccountPassword.field.password"),
    })
  }
  if (validationDeps.invalidPassword(value)) {
    return t("shared:validation.password")
  }
  return ValidField
}

const validateConfirmPassword = (value: string, password: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("newAccountPassword.field.confirmPassword"),
    })
  }
  if (value !== password) {
    return t("newAccountPassword.validation.passwordMatch")
  }
  return ValidField
}
