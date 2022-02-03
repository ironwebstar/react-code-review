import validator from "validator"
import { TFunction } from "i18next"
import { FieldTouched, validate, ValidField } from "../../Shared.Validation"

export const validatePrices = {
  title: (value: string, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (!value) {
        return t("shared:validation.mandatory", {
          field: t("form.field.title"),
        })
      }
      return ValidField
    }, touched),
  solarPower: (value: string, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (!value) {
        return t("shared:validation.mandatory", {
          field: t("form.field.solarPower"),
        })
      }
      if (!validator.isNumeric(value)) {
        return t("shared:validation.valid.number", {
          field: t("form.field.solarPower"),
        })
      }
      return ValidField
    }, touched),
  highTariff: (value: string, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (!value) {
        return t("shared:validation.mandatory", {
          field: t("form.field.highTariff"),
        })
      }
      if (!validator.isNumeric(value)) {
        return t("shared:validation.valid.number", {
          field: t("form.field.highTariff"),
        })
      }
      return ValidField
    }, touched),
  lowTariff: (value: string, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (!value) {
        return t("shared:validation.mandatory", {
          field: t("form.field.lowTariff"),
        })
      }
      if (!validator.isNumeric(value)) {
        return t("shared:validation.valid.number", {
          field: t("form.field.lowTariff"),
        })
      }
      return ValidField
    }, touched),
  measurementServicePerHour: (value: string, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (!value) {
        return t("shared:validation.mandatory", {
          field: t("form.field.measurementServicePerHour"),
        })
      }
      if (!validator.isNumeric(value)) {
        return t("shared:validation.valid.number", {
          field: t("form.field.measurementServicePerHour"),
        })
      }
      return ValidField
    }, touched),
  measurementServiceMonth: (value: string, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (!value) {
        return t("shared:validation.mandatory", {
          field: t("form.field.measurementServiceMonth"),
        })
      }
      if (!validator.isNumeric(value)) {
        return t("shared:validation.valid.number", {
          field: t("form.field.measurementServiceMonth"),
        })
      }
      return ValidField
    }, touched),
  spikePrice: (value: string, containsSpikePrice: boolean, touched: FieldTouched, t: TFunction) =>
    validate(() => {
      if (containsSpikePrice && !value) {
        return t("shared:validation.mandatory", {
          field: t("form.field.spikePrice"),
        })
      }
      if (containsSpikePrice && !validator.isNumeric(value)) {
        return t("shared:validation.valid.number", {
          field: t("form.field.spikePrice"),
        })
      }
      return ValidField
    }, touched),
}
