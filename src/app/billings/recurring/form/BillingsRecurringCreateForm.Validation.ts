import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { BillingsRecurringUpsert } from "../../../../domain/billings/recurring/BillingsRecurring.Model"
import { ValidField, validationResult } from "../../../Shared.Validation"

export const validateBillingsRecurring = (
  values: BillingsRecurringUpsert,
  t: TFunction,
): FormikErrors<BillingsRecurringUpsert> => {
  return validationResult({
    selectedZevs: validateSelectedZevs(values.selectedZevs, t),
  })
}

const validateSelectedZevs = (value: string[], t: TFunction) => {
  if (value.length < 1) {
    return t("shared:validation.length", {
      field: t("form.field.selectZev"),
      length: 1,
    })
  }
  return ValidField
}
