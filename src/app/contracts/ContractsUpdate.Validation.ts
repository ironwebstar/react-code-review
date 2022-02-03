import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ContractUpsert } from "../../domain/contracts/Contracts.Models"
import { validationResult, ValidField } from "../Shared.Validation"

export function validateContract(values: ContractUpsert, t: TFunction): FormikErrors<ContractUpsert> {
  return validationResult({
    startDate: validateStartDate(values.startDate, t),
    productId: validateProductId(values.productId, t),
  })
}

export const validateStartDate = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("form.field.startDate"),
    })
  }
  return ValidField
}

export const validateProductId = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.product"),
    })
  }
  return ValidField
}
