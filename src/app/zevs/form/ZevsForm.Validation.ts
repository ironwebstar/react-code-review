import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ZevsUpsert } from "../../../domain/zevs/ZevsUpsert.Model"
import { ValidField, validationResult, ValidationDeps } from "../../Shared.Validation"

export const validateCreateZev = (
  values: ZevsUpsert,
  validationDeps: ValidationDeps,
  t: TFunction,
): FormikErrors<ZevsUpsert> => {
  return validateZev(values, validationDeps, t)
}

export const validateUpdateZev = (
  values: ZevsUpsert,
  validationDeps: ValidationDeps,
  t: TFunction,
): FormikErrors<ZevsUpsert> => {
  return validationResult({
    ...validateZev(values, validationDeps, t),
    nextBillingDate: validateNextBillingDate(values.nextBillingDate, t),
    zevStartDate: validateZevStartDate(values.zevStartDate, t),
  })
}

export const validateZev = (
  values: ZevsUpsert,
  validationDeps: ValidationDeps,
  t: TFunction,
): FormikErrors<ZevsUpsert> => {
  return validationResult({
    name: validateName(values.name, t),
    serviceStartDate: validateServiceStartDate(values.serviceStartDate, t),
    externalReferenceNumber: validateExternalReferenceNumber(values.externalReferenceNumber, t),
    incomingMeteringCode: validateIncomingMeteringCode(values.incomingMeteringCode, t),
    outgoingMeteringCode: validateOutgoingMeteringCode(values.outgoingMeteringCode, t),
    contactTelephoneNumber: validateContactTelephoneNumber(values.contactTelephoneNumber, validationDeps, t),
    contactMobileNumber: validateContactMobileNumber(values.contactMobileNumber, validationDeps, t),
    contactEmail: validateContactEmail(values.contactEmail, validationDeps, t),
    addressLineOne: validateAddressLineOne(values.addressLineOne, t),
    addressStreet: validateAddressStreet(values.addressStreet, t),
    addressHouseNumber: validateAddressHouseNumber(values.addressHouseNumber, t),
    addressPostalCode: validateAddressPostalCode(values.addressPostalCode, t),
    addressCity: validateAddressCity(values.addressCity, t),
    municipality: validateMunicipality(values.municipality, t),
    mainContactName: validateMainContactName(values.mainContactName, t),
    paymentInformationPayee: validatePaymentInformationPayee(values.paymentInformationPayee, t),
    paymentInformationAccountNumber: validatePaymentInformationAccountNumber(values.paymentInformationAccountNumber, t),
    paymentInformationIban: validatePaymentInformationIban(values.paymentInformationIban, validationDeps, t),
    paymentInformationAddressStreet: validatePaymentInformationAddressStreet(values.paymentInformationAddressStreet, t),
    paymentInformationAddressHouseNumber: validatePaymentInformationAddressHouseNumber(
      values.paymentInformationAddressHouseNumber,
      t,
    ),
    paymentInformationAddressPostalCode: validatePaymentInformationAddressPostalCode(
      values.paymentInformationAddressPostalCode,
      t,
    ),
    paymentInformationAddressCity: validatePaymentInformationAddressCity(values.paymentInformationAddressCity, t),
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

const validateServiceStartDate = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("form.field.serviceStartDate"),
    })
  }
  return ValidField
}

const validateNextBillingDate = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("form.field.nextBillingDate"),
    })
  }
  return ValidField
}

const validateZevStartDate = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("form.field.zevStartDate"),
    })
  }
  return ValidField
}

const validateExternalReferenceNumber = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.externalReferenceNumber"),
    })
  }
  return ValidField
}

const validateIncomingMeteringCode = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.incomingMeteringCode"),
    })
  }
  if (value.length !== 33) {
    return t("shared:validation.length", {
      field: t("form.field.incomingMeteringCode"),
      length: 33,
    })
  }
  return ValidField
}

const validateOutgoingMeteringCode = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.outgoingMeteringCode"),
    })
  }
  if (value.length < 33) {
    return t("shared:validation.length", {
      field: t("form.field.outgoingMeteringCode"),
      length: 33,
    })
  }
  return ValidField
}

const validateContactTelephoneNumber = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (value && !validationDeps.validSwissPhoneNumber(value)) {
    return t("shared:validation.valid.phoneNumber", {
      field: t("form.field.contactTelephoneNumber"),
    })
  }
  return ValidField
}

const validateContactMobileNumber = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (value && !validationDeps.validSwissMobile(value)) {
    return t("shared:validation.valid.mobileNumber", {
      field: t("form.field.contactMobileNumber"),
    })
  }
  return ValidField
}

const validateContactEmail = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (value && !validationDeps.validEmail(value)) {
    return t("shared:validation.valid.email", {
      field: t("form.field.contactEmail"),
    })
  }
  return ValidField
}

const validateAddressLineOne = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressLineOne"),
    })
  }
  return ValidField
}

const validateAddressStreet = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressStreet"),
    })
  }
  return ValidField
}

const validateAddressHouseNumber = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressHouseNumber"),
    })
  }
  return ValidField
}

const validateAddressPostalCode = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressPostalCode"),
    })
  } else if (value.length < 4) {
    return t("shared:validation.length", {
      field: t("form.field.addressPostalCode"),
      length: 4,
    })
  }
  return ValidField
}

const validateAddressCity = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressCity"),
    })
  }
  return ValidField
}

const validateMunicipality = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.municipality"),
    })
  }
  return ValidField
}

const validateMainContactName = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.mainContactName"),
    })
  }
  return ValidField
}

const validatePaymentInformationPayee = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.paymentInformationPayee"),
    })
  }
  return ValidField
}

const validatePaymentInformationAccountNumber = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.paymentInformationAccountNumber"),
    })
  }
  return ValidField
}

const validatePaymentInformationIban = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.paymentInformationIban"),
    })
  }
  if (!validationDeps.validIban(value)) {
    return t("shared:validation.valid.iban", {
      field: t("form.field.paymentInformationIban"),
    })
  }
  return ValidField
}

const validatePaymentInformationAddressStreet = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.paymentInformationAddressStreet"),
    })
  }
  return ValidField
}

const validatePaymentInformationAddressHouseNumber = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.paymentInformationAddressHouseNumber"),
    })
  }
  return ValidField
}

const validatePaymentInformationAddressPostalCode = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.paymentInformationAddressPostalCode"),
    })
  }
  if (value.length < 4) {
    return t("shared:validation.length", {
      field: t("form.field.paymentInformationAddressPostalCode"),
      length: 4,
    })
  }
  return ValidField
}

const validatePaymentInformationAddressCity = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.paymentInformationAddressCity"),
    })
  }
  return ValidField
}
