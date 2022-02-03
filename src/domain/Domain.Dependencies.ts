import {
  ApiCookie,
  createCookieBearerToken,
  createCookieRefreshToken,
  readCookieBearerToken,
  readCookieRefreshToken,
  removeCookies,
} from "../data/Api.Cookie"
import {
  AdminAllParticipantBillingApi,
  AdminBillsApi,
  AdminBuildingApi,
  AdminConsumptionPointApi,
  AdminContractsApi,
  AdminIndividualParticipantBillingApi,
  AdminMeterReadingsApi,
  AdminParticipantsApi,
  AdminProductsAndServicesApi,
  AdminProfileApi,
  AdminServiceBillingsApi,
  AdminSessionApi,
  AdminTasksApi,
  AdminZevApi,
  ParticipantDetailCsvApi,
} from "../data/generated-sources/openapi/api"
import { Configuration } from "../data/generated-sources/openapi/configuration"

export interface DomainConfig {
  baseUrl: string
  appName: string
  locale: Locale
}

export interface DomainDependencies {
  adminProfileApi: AdminProfileApi
  adminSessionApi: AdminSessionApi
  adminZevApi: AdminZevApi
  adminBuildingApi: AdminBuildingApi
  adminConsumptionPointApi: AdminConsumptionPointApi
  adminProductsAndServicesApi: AdminProductsAndServicesApi
  adminContractsApi: AdminContractsApi
  adminMeterReadingsApi: AdminMeterReadingsApi
  adminServiceBillingsApi: AdminServiceBillingsApi
  adminBillsApi: AdminBillsApi
  adminAllParticipantBillingApi: AdminAllParticipantBillingApi
  adminIndividualParticipantBillingApi: AdminIndividualParticipantBillingApi
  adminParticipantsApi: AdminParticipantsApi
  adminTasksApi: AdminTasksApi
  adminParticipantDetailCsvApi: ParticipantDetailCsvApi
  cookie: ApiCookie
  config: DomainConfig
}

export const domainDependencies = (domainConfig: DomainConfig): DomainDependencies => {
  const apiConfig = new Configuration()
  return {
    adminProfileApi: new AdminProfileApi(apiConfig, domainConfig.baseUrl),
    adminSessionApi: new AdminSessionApi(apiConfig, domainConfig.baseUrl),
    adminZevApi: new AdminZevApi(apiConfig, domainConfig.baseUrl),
    adminBuildingApi: new AdminBuildingApi(apiConfig, domainConfig.baseUrl),
    adminConsumptionPointApi: new AdminConsumptionPointApi(apiConfig, domainConfig.baseUrl),
    adminProductsAndServicesApi: new AdminProductsAndServicesApi(apiConfig, domainConfig.baseUrl),
    adminContractsApi: new AdminContractsApi(apiConfig, domainConfig.baseUrl),
    adminMeterReadingsApi: new AdminMeterReadingsApi(apiConfig, domainConfig.baseUrl),
    adminServiceBillingsApi: new AdminServiceBillingsApi(apiConfig, domainConfig.baseUrl),
    adminBillsApi: new AdminBillsApi(apiConfig, domainConfig.baseUrl),
    adminAllParticipantBillingApi: new AdminAllParticipantBillingApi(apiConfig, domainConfig.baseUrl),
    adminIndividualParticipantBillingApi: new AdminIndividualParticipantBillingApi(apiConfig, domainConfig.baseUrl),
    adminParticipantsApi: new AdminParticipantsApi(apiConfig, domainConfig.baseUrl),
    adminTasksApi: new AdminTasksApi(apiConfig, domainConfig.baseUrl),
    adminParticipantDetailCsvApi: new ParticipantDetailCsvApi(apiConfig, domainConfig.baseUrl),
    cookie: {
      readCookieBearerToken: readCookieBearerToken,
      createCookieBearerToken: createCookieBearerToken,
      readCookieRefreshToken: readCookieRefreshToken,
      createCookieRefreshToken: createCookieRefreshToken,
      removeCookies: removeCookies,
    },
    config: domainConfig,
  }
}
