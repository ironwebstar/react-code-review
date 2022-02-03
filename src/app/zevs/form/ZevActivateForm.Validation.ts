import { TFunction } from "i18next"
import { FieldTouched, validate, ValidField } from "../../Shared.Validation"

export const validateZevActivate = {
  billableFromDate: (value: number, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (value === -1) {
        return t("shared:validation.mandatory", {
          field: t("form.field.billableFromDate"),
        })
      }
      return ValidField
    }, touched),
}
