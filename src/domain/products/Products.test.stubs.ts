import { BillingType, PowerMeterType, ProductDetail, ProductItem } from "./Products.Model"
import {
  ProductAdminResponse,
  ServiceComponentAdminResponse,
  ServiceComponentFeature,
} from "../../data/generated-sources/openapi"
import { ServiceComponentListItem } from "../service-components/ServiceComponents.Model"
import { DomainConfig } from "../Domain.Dependencies"

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: {
    code: "de",
  },
}

export const productStub: ProductItem = {
  id: "5d363bfd-6010-4591-bc6d-846bd4163f6f",
  name: "product",
  serviceComponents: [
    {
      id: "ab89e598-563c-4976-b450-73cb52709e85",
      name: "ZEV Participant Billing",
      feature: "ZEV_PARTICIPANT_BILLING",
    },
  ],
}

export const productDetailStub: ProductDetail = {
  id: "5d363bfd-6010-4591-bc6d-846bd4163f6f",
  name: "price component",
  serviceComponents: [
    {
      id: "ab89e598-563c-4976-b450-73cb52709e85",
      name: "ZEV Participant Billing",
      feature: "ZEV_PARTICIPANT_MANAGEMENT",
    },
  ],
  priceComponents: [
    {
      id: "1b9eca6d-570b-4248-a6ef-53f47876f76f",
      name: "44",
      billingType: BillingType.MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT,
      priceWithoutVat: "5.00",
      validFrom: "2022-01-01",
      validUntil: "2023-01-01",
      externalReferenceNumber: "555",
      powermeterType: PowerMeterType.HOUSEHOLD_POWERMETER,
    },
  ],
}

export const serviceComponentsStub: ServiceComponentAdminResponse = {
  id: "serviceComponentsIdOne",
  name: "collectionServiceComp",
  feature: ServiceComponentFeature.COLLECTION,
}

export const productAdminResponseStub: ProductAdminResponse = {
  id: "5d363bfd-6010-4591-bc6d-846bd4163f6f",
  name: "product",
  serviceComponents: [
    "30f4082d-6fef-43aa-85de-25a1cf277057",
    "84321bff-b580-4e4c-9608-fafa8e218dc3",
    "ab89e598-563c-4976-b450-73cb52709e85",
  ],
  priceComponents: [
    {
      id: "1b9eca6d-570b-4248-a6ef-53f47876f76f",
      name: "44",
      billingType: BillingType.MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT,
      priceWithoutVat: "5.00",
      validFrom: "2022-01-01",
      validUntil: "2023-01-01",
      externalReferenceNumber: "555",
      powermeterType: PowerMeterType.HOUSEHOLD_POWERMETER,
    },
  ],
}

export const productUpsertStub = {
  name: "product",
  serviceComponents: [
    "30f4082d-6fef-43aa-85de-25a1cf277057",
    "84321bff-b580-4e4c-9608-fafa8e218dc3",
    "ab89e598-563c-4976-b450-73cb52709e85",
  ],
}

export const serviceComponentStub: ServiceComponentListItem = {
  id: "ab89e598-563c-4976-b450-73cb52709e85",
  name: "ZEV Participant Billing",
  feature: ServiceComponentFeature.ZEV_PARTICIPANT_BILLING,
}
