import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ValidationDeps, validationResult, ValidField } from "../../Shared.Validation"
import { ProfileUpsert } from "../../../domain/profiles/Profiles.Model"

export function validateProfile(
  values: ProfileUpsert,
  t: TFunction,
  validationDeps: ValidationDeps,
): FormikErrors<ProfileUpsert> {
  return validationResult({
    firstName: validateFirstNameField(values.firstName, t),
    lastName: validateLastNameField(values.lastName, t),
    street: validateStreetName(values.street, t),
    houseNumber: validateHouseNumber(values.houseNumber, t),
    postalCode: validatePostalCode(values.postalCode, t),
    city: validateCity(values.city, t),
    telephone: validateTelephoneNumber(values.telephone, t, validationDeps),
    mobile: validateMobileNumber(values.mobile, t, validationDeps),
    email: validateEmail(values.email, t, validationDeps),
  })
}

const validateFirstNameField = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.first-name"),
    })
  }
  return ValidField
}

const validateLastNameField = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.lastName"),
    })
  }
  return ValidField
}

const validateStreetName = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.street"),
    })
  }
  return ValidField
}

const validateHouseNumber = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.house-number"),
    })
  }
  return ValidField
}

const validatePostalCode = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.postalCode"),
    })
  } else if (value.length < 4) {
    return t("shared:validation.length", {
      field: t("form.field.postalCode"),
      length: 4,
    })
  }
  return ValidField
}

const validateCity = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("form.field.city"),
    })
  }
  return ValidField
}

const validateTelephoneNumber = (value: string | undefined, t: TFunction, validationDeps: ValidationDeps) => {
  if (value && !validationDeps.validSwissPhoneNumber(value)) {
    return t("shared:validation.valid.phoneNumber", {
      field: t("form.field.telephone"),
    })
  }
  return ValidField
}

const validateMobileNumber = (value: string | undefined, t: TFunction, validationDeps: ValidationDeps) => {
  if (value && !validationDeps.validSwissMobile(value)) {
    return t("shared:validation.valid.mobileNumber", {
      field: t("form.field.mobile"),
    })
  }
  return ValidField
}

const validateEmail = (value: string | undefined, t: TFunction, validationDeps: ValidationDeps) => {
  if (value && !validationDeps.validEmail(value)) {
    return t("shared:validation.valid.email", {
      field: t("form.field.email"),
    })
  }
  return ValidField
}
