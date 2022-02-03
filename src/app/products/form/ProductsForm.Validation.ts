import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ProductUpsert } from "../../../domain/products/Products.Model"
import { validationResult, ValidField } from "../../Shared.Validation"

export const validateProduct = (values: ProductUpsert, t: TFunction): FormikErrors<ProductUpsert> => {
  return validationResult({
    name: validateName(values.name, t),
  })
}

const validateName = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.name"),
    })
  }
  return ValidField
}
