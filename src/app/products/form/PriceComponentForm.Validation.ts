import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ValidationDeps, validationResult, ValidField } from "../../Shared.Validation"
import { BillingType, PowerMeterType, ProductPriceComponentUpsert } from "../../../domain/products/Products.Model"

export function validatePriceComponentForm(
  values: ProductPriceComponentUpsert,
  validationDeps: ValidationDeps,
  t: TFunction,
): FormikErrors<ProductPriceComponentUpsert> {
  return validationResult({
    name: validatePriceComponentName(values.name, t),
    billingType: validatePriceComponentBillingType(values.billingType, t),
    powermeterType: validatePriceComponentPowermeterType(values.powermeterType, values.billingType, t),
    priceWithoutVat: validatePriceComponentPriceWithoutVat(values.priceWithoutVat, validationDeps, t),
    validFrom: validatePriceComponentValidFrom(values.validFrom, t),
    externalReferenceNumber: validatePriceComponentExternalReferenceNumber(values.externalReferenceNumber, t),
  })
}

const validatePriceComponentName = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("price.form.field.name"),
    })
  }
  return ValidField
}

const validatePriceComponentBillingType = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("price.form.field.billingType"),
    })
  }
  return ValidField
}

const validatePriceComponentPowermeterType = (
  value: PowerMeterType | undefined,
  billingType: BillingType,
  t: TFunction,
) => {
  if (!value && billingType === BillingType.MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT) {
    return t("shared:validation.mandatory", {
      field: t("price.form.field.powermeterType"),
    })
  }
  return ValidField
}

const validatePriceComponentPriceWithoutVat = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("price.form.field.priceWithoutVat"),
    })
  }
  if (!validationDeps.validNumber(value)) {
    return t("shared:validation.valid.number", {
      field: t("price.form.field.priceWithoutVat"),
    })
  }
  return ValidField
}

const validatePriceComponentValidFrom = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("price.form.field.validFrom"),
    })
  }
  return ValidField
}

const validatePriceComponentExternalReferenceNumber = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("price.form.field.externalReferenceNumber"),
    })
  }
  return ValidField
}
