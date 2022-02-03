import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ParticipantUpsert } from "../../../domain/participant/Participant.Model"
import { ValidationDeps, validationResult, ValidField } from "../../Shared.Validation"

export function validateParticipant(
  values: ParticipantUpsert,
  validationDeps: ValidationDeps,
  t: TFunction,
): FormikErrors<ParticipantUpsert> {
  return validationResult({
    businessPartnerName: ValidField,
    businessPartnerType: validateBusinessPartnerType(values.businessPartnerType, t),
    salutation: validateSalutation(values.salutation, t),
    title: ValidField,
    firstName: validateFirstName(values.firstName, t),
    lastName: validateLastName(values.lastName, t),
    firstNameSecondPerson: ValidField,
    lastNameSecondPerson: ValidField,
    contactTelephone: validateContactTelephone(values.contactTelephone, validationDeps, t),
    contactMobile: validateContactMobile(values.contactMobile, validationDeps, t),
    contactEmail: validateContactEmail(values.contactEmail, validationDeps, t),
    addressStreet: validateAddressStreet(values.addressStreet, t),
    addressHouseNumber: validateAddressHouseNumber(values.addressHouseNumber, t),
    addressCO: ValidField,
    addressPostBox: ValidField,
    addressPostCode: validateAddressPostCode(values.addressPostCode, t),
    addressCity: validateAddressCity(values.addressCity, t),
    addressCountry: validateAddressCountry(values.addressCountry, t),
  })
}

const validateBusinessPartnerType = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.businessPartnerType"),
    })
  }
  return ValidField
}

const validateSalutation = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.salutation"),
    })
  }
  return ValidField
}

const validateFirstName = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.firstName"),
    })
  }
  return ValidField
}

const validateLastName = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.lastName"),
    })
  }
  return ValidField
}

const validateContactTelephone = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (value && !validationDeps.validSwissPhoneNumber(value)) {
    return t("shared:validation.valid.phoneNumber", {
      field: t("form.field.contactTelephone"),
    })
  }
  return ValidField
}

const validateContactMobile = (value: string, validationDeps: ValidationDeps, t: TFunction) => {
  if (value && !validationDeps.validSwissMobile(value)) {
    return t("shared:validation.valid.mobileNumber", {
      field: t("form.field.contactMobile"),
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

const validateAddressPostCode = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressPostCode"),
    })
  } else if (value.length < 4) {
    return t("shared:validation.length", {
      field: t("form.field.addressPostCode"),
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

const validateAddressCountry = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.addressCountry"),
    })
  }
  return ValidField
}
