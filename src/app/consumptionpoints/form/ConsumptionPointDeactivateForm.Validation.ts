import { TFunction } from "i18next"
import { FieldTouched, validate, ValidField } from "../../Shared.Validation"

export const validateConsumptionPointDeactivate = {
  deactivateFrom: (value: number, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (value === -1) {
        return t("shared:validation.mandatory", {
          field: t("form.field.deactivateFrom"),
        })
      }
      return ValidField
    }, touched),
}
