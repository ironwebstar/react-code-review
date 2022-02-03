import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import {
  ConsumptionPointPricePackage,
  ConsumptionPointUpsert,
  ConsumptionPointUpsertPricePackageOption,
} from "../../../domain/consumptionpoints/ConsumptionPoints.Model"
import { validationResult, ValidField } from "../../Shared.Validation"

export function validateUpdateConsumptionPoint(
  values: ConsumptionPointUpsert,
  pricePackageOptions: ConsumptionPointPricePackage[],
  t: TFunction,
): FormikErrors<ConsumptionPointUpsert> {
  return validationResult({
    ...validateConsumptionPoint(values, pricePackageOptions, t),
    billableFrom: validateBillableFrom(values.billableFrom, t),
  })
}

export function validateConsumptionPoint(
  values: ConsumptionPointUpsert,
  pricePackageOptions: ConsumptionPointPricePackage[],
  t: TFunction,
): FormikErrors<ConsumptionPointUpsert> {
  return validationResult({
    name: validateName(values.name, t),
    type: validateType(values.type, t),
    powerMeterType: validatePowerMeterType(values.powerMeterType, t),
    pricePackageId: validatePricePackageId(pricePackageOptions, values.pricePackageId, t),
    meteringCode: validateMeteringCode(values.meteringCode, t),
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

const validateType = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.type"),
    })
  }
  return ValidField
}

const validateBillableFrom = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("form.field.billableFrom"),
    })
  }
  return ValidField
}

const validatePricePackageId = (options: ConsumptionPointUpsertPricePackageOption[], value: number, t: TFunction) => {
  if (!options.find((option) => option.id === value)) {
    return t("shared:validation.mandatory", {
      field: t("form.field.pricePackageId"),
    })
  }
  return ValidField
}

const validatePowerMeterType = (value: ConsumptionPointUpsert["powerMeterType"], t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.powerMeterType"),
    })
  }
  return ValidField
}

const validateMeteringCode = (value: ConsumptionPointUpsert["meteringCode"], t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.meteringCode"),
    })
  }
  return ValidField
}
