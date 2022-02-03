import i18n, { i18n as Ii18n } from "i18next"
import localeDateDE from "date-fns/locale/de"
import localeDateEN from "date-fns/locale/en-US"
import { initReactI18next } from "react-i18next"

import { SharedI18n } from "./Shared.i18n"
import { AppContainerI18n } from "./appcontainer/AppContainer.i18n"
import { AuthI18n } from "./auth/Auth.i18n"
import { ProfilesI18n } from "./profiles/Profiles.i18n"
import { ZevsI18n } from "./zevs/Zevs.i18n"
import { TaskListI18n } from "./taskslist/TaskList.i18n"
import { ContractsI18n } from "./contracts/Contracts.i18n"
import { BuildingsI18n } from "./buildings/Buildings.i18n"
import { BillingsInitialI18n } from "./billings/initial/BillingsInitial.i18n"
import { ConsumptionPointsI18n } from "./consumptionpoints/ConsumptionPoints.i18n"
import { ConsumptionPointsParticipationsI18n } from "./consumptionpoints/ConsumptionPointsParticipations.i18n"
import { ParticipantI18n } from "./participant/Participant.i18n"
import { ProductI18n } from "./products/Products.i18n"
import { ServiceComponentsI18n } from "./service-components/ServiceComponents.i18n"
import { MyProfileI18n } from "./my-profile/MyProfile.i18n"
import { BillingsRecurringI18n } from "./billings/recurring/BillingsRecurring.i18n"
import { MeterReadingsI18n } from "./meter-readings/MeterReadings.i18n"
import { SettingsComponentsI18n } from "./settings/Settings.i18n"
import { BillingsParticipantI18n } from "./billings/participant/BillingsParticipant.i18n"
import { PricesI18n } from "./prices/Prices.i18n"
import { SharedErrorI18n } from "./Shared.Error.i18n"

export interface I18nNamespace {
  name: string
  de: Record<string, string>
  en: Record<string, string>
}

const namespaces = [
  SharedI18n,
  SharedErrorI18n,
  AppContainerI18n,
  AuthI18n,
  ZevsI18n,
  ProfilesI18n,
  TaskListI18n,
  ServiceComponentsI18n,
  ContractsI18n,
  BuildingsI18n,
  BillingsInitialI18n,
  BillingsRecurringI18n,
  BillingsParticipantI18n,
  ConsumptionPointsI18n,
  ConsumptionPointsParticipationsI18n,
  ParticipantI18n,
  ProductI18n,
  MeterReadingsI18n,
  MyProfileI18n,
  SettingsComponentsI18n,
  PricesI18n,
]

export const setupI18N = (): Ii18n => {
  i18n.use(initReactI18next).init({
    lng: process.env.APP_LANG,
    resources: {},
    fallbackLng: "de",
    interpolation: {
      escapeValue: false,
    },
  })
  namespaces.forEach((namespace) => {
    i18n.addResourceBundle("de", namespace.name, namespace.de)
    i18n.addResourceBundle("en", namespace.name, namespace.en)
  })
  return i18n
}

export const getDateLocale = (): Locale => {
  switch (process.env.APP_LANG) {
    case "en":
      return localeDateEN
    case "de":
    default:
      return localeDateDE
  }
}

export const translateErrorCode = (key?: string, message?: string) => {
  switch (process.env.APP_LANG) {
    case "en":
      if (!key) return SharedErrorI18n.en.GENERIC_FATAL_ERROR
      if (SharedErrorI18n.en[key]) return SharedErrorI18n.en[key]
      return `${SharedErrorI18n.en.GENERIC_FATAL_ERROR} ${message}`
    case "de":
    default:
      if (!key) return SharedErrorI18n.de.GENERIC_FATAL_ERROR
      if (SharedErrorI18n.de[key]) return SharedErrorI18n.de[key]
      return `${SharedErrorI18n.de.GENERIC_FATAL_ERROR} ${message}`
  }
}
