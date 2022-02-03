import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { BuildingUpsert } from "../../../domain/buildings/Buildings.Model"
import { validationResult, ValidField } from "../../Shared.Validation"

export function validateBuilding(values: BuildingUpsert, t: TFunction): FormikErrors<BuildingUpsert> {
  return validationResult({
    buildingObject: validateBuildingObject(values.buildingObject, t),
    addressStreet: validateAddressStreet(values.addressStreet, t),
    addressHouseNumber: validateAddressHouseNumber(values.addressHouseNumber, t),
    addressPostCode: validateAddressPostCode(values.addressPostCode, t),
    addressCity: validateAddressCity(values.addressCity, t),
  })
}

export const validateBuildingObject = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.buildingObject"),
    })
  }
  return ValidField
}

export const validateAddressStreet = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressStreet"),
    })
  }
  return ValidField
}

export const validateAddressHouseNumber = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressHouseNumber"),
    })
  }
  return ValidField
}

export const validateAddressPostCode = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressPostCode"),
    })
  }
  if (value.length < 4) {
    return t("shared:validation.length", {
      field: t("form.field.addressPostCode"),
      length: 4,
    })
  }
  return ValidField
}

export const validateAddressCity = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressCity"),
    })
  }
  return ValidField
}
