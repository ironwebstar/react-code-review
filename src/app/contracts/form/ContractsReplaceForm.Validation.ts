import { FieldTouched, validate, ValidField } from "../../Shared.Validation"
import { TFunction } from "i18next"

export const validateContractsReplace = {
  currentContractEndDate: (value: number, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (value === -1) {
        return t("shared:validation.mandatory", {
          field: t("detail.replace.form.field.requiredEndDate"),
        })
      }
      return ValidField
    }, touched),
}
