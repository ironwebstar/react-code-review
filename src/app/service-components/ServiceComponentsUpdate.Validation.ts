import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { validationResult, ValidField } from "../Shared.Validation"
import { ServiceComponentsUpdateValues } from "./ServiceComponentsUpdate.Component"

export function validateServiceComponent(
  values: ServiceComponentsUpdateValues,
  t: TFunction,
): FormikErrors<ServiceComponentsUpdateValues> {
  return validationResult({
    name: validateName(values.name, t),
  })
}

export const validateName = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.name"),
    })
  }
  return ValidField
}
