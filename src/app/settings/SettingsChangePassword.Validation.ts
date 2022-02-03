import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ValidationDeps, validationResult, ValidField } from "../Shared.Validation"
import { SettingsChangePasswordValues } from "./SettingsChangePassword.Component"

export function validateChangePassword(
  values: SettingsChangePasswordValues,
  validationDeps: ValidationDeps,
  t: TFunction,
): FormikErrors<SettingsChangePasswordValues> {
  return validationResult({
    currentPassword: validateCurrentPassword(values.currentPassword, t),
    newPassword: validateNewPassword(values.newPassword, validationDeps, t),
    confirmNewPassword: validateConfirmNewPassword(values.confirmNewPassword, values.newPassword, t),
  })
}

const validateCurrentPassword = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.current-password"),
    })
  }
  return ValidField
}

const validateNewPassword = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.new-password"),
    })
  }
  if (value.length < 8) {
    return t("shared:validation.length", {
      field: t("form.field.new-password"),
      length: 8,
    })
  }
  if (validationDeps.invalidPassword(value)) {
    return t("shared:validation.password")
  }
  return ValidField
}

const validateConfirmNewPassword = (value: string, newPassword: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.new-password-confirm"),
    })
  }
  if (value !== newPassword) {
    return t("form.validation.new-password-match")
  }
  return ValidField
}
