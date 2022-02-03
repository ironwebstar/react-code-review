import { TFunction } from "i18next"
import { FieldTouched, validate, ValidField } from "../../Shared.Validation"

export const validateZevDeactivate = {
  billableUntilDate: (value: number, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (value === -1) {
        return t("shared:validation.mandatory", {
          field: t("form.field.billableUntilDate"),
        })
      }
      return ValidField
    }, touched),
}
