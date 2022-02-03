import {
  ParticipantPersonalData,
  ParticipantPersonalDataSalutationEnum,
  PersonalData,
  PersonalDataSalutationEnum,
} from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"

export const formatPersonalFullName = (
  personalData: PersonalData | ParticipantPersonalData,
  deps: DomainDependencies,
) => {
  return (
    `${formatTitleSalutation(personalData.title, personalData.salutation, deps)} ` +
    `${personalData.firstName} ${personalData.lastName}`.trim()
  )
}

export const formatTitleSalutation = (
  title: string | undefined,
  salutation: ParticipantPersonalDataSalutationEnum | PersonalDataSalutationEnum,
  deps: DomainDependencies,
) => {
  if (!title) return formatSalutation(salutation, deps)
  return `${title} ${formatSalutation(salutation, deps)}`
}

export const formatSalutation = (
  salutation: ParticipantPersonalDataSalutationEnum | PersonalDataSalutationEnum,
  deps: DomainDependencies,
) => {
  if (deps.config.locale === undefined || deps.config.locale.code === "de") {
    switch (salutation) {
      case PersonalDataSalutationEnum.MR:
        return "Herr"
      case PersonalDataSalutationEnum.MS:
        return "Frau"
      case ParticipantPersonalDataSalutationEnum.MR_AND_MS:
        return "Herr und Frau"
      case ParticipantPersonalDataSalutationEnum.MRS:
        return "Herren"
      case ParticipantPersonalDataSalutationEnum.MSS:
        return "Frauen"
      case ParticipantPersonalDataSalutationEnum.SHARED_FLAT:
        return "Wohngemeinschaft"
      case ParticipantPersonalDataSalutationEnum.COMPANY:
        return "Unternehmen"
      case ParticipantPersonalDataSalutationEnum.UNDEFINED:
        return ""
    }
  } else if (deps.config.locale.code === "en") {
    switch (salutation) {
      case PersonalDataSalutationEnum.MR:
        return "Mr"
      case PersonalDataSalutationEnum.MS:
        return "Ms"
      case ParticipantPersonalDataSalutationEnum.MR_AND_MS:
        return "Mr and Ms"
      case ParticipantPersonalDataSalutationEnum.MRS:
        return "Mr"
      case ParticipantPersonalDataSalutationEnum.MSS:
        return "Mrs"
      case ParticipantPersonalDataSalutationEnum.SHARED_FLAT:
        return "Shared flat"
      case ParticipantPersonalDataSalutationEnum.COMPANY:
        return "Company"
      case ParticipantPersonalDataSalutationEnum.UNDEFINED:
        return ""
    }
  }
  return salutation
}
