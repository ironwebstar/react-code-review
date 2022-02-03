import { ServiceComponentFeature, ServiceComponentAdminResponse } from "../../data/generated-sources/openapi/api"
import { DomainConfig } from "../Domain.Dependencies"

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: {
    code: "de",
  },
}
export const serviceComponentStub: ServiceComponentAdminResponse = {
  feature: ServiceComponentFeature.ZEV_PARTICIPANT_BILLING,
  id: "ab89e598-563c-4976-b450-73cb52709e85",
  name: "ZEV Participant Billing",
}
