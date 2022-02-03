export enum BillingType {
  MONTHLY_FEE = "MONTHLY_FEE",
  INITIAL_FEE = "INITIAL_FEE",
  INITIAL_FEE_PER_CONSUMPTION_POINT = "INITIAL_FEE_PER_CONSUMPTION_POINT",
  MONTHLY_FEE_PER_CONSUMPTION_POINT = "MONTHLY_FEE_PER_CONSUMPTION_POINT",
  MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT = "MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT",
}

export enum PowerMeterType {
  HOUSEHOLD_POWERMETER = "HOUSEHOLD_POWERMETER",
  HOUSEHOLD_POWERMETER_ON_RAILS = "HOUSEHOLD_POWERMETER_ON_RAILS",
  COMMERCIAL_POWERMETER_SMALL = "COMMERCIAL_POWERMETER_SMALL",
  COMMERCIAL_POWERMETER_LARGE = "COMMERCIAL_POWERMETER_LARGE",
}

export enum ServiceComponentFeature {
  COLLECTION = "COLLECTION",
  POWERMETER_READING = "POWERMETER_READING",
  ZEV_PARTICIPANT_BILLING = "ZEV_PARTICIPANT_BILLING",
  ZEV_PARTICIPANT_MANAGEMENT = "ZEV_PARTICIPANT_MANAGEMENT",
}

export const billingTypeKeys = Object.keys(BillingType)

export const powermeterTypeKeys = Object.keys(PowerMeterType)

export interface ProductPriceComponent {
  id: string
  name: string
  billingType: BillingType
  powermeterType?: PowerMeterType
  priceWithoutVat: string
  validFrom: string
  validUntil: string
  externalReferenceNumber: string
}

export interface ProductItem {
  id: string
  name: string
  serviceComponents: {
    id: string
    name: string
    feature: string
  }[]
}

export interface ProductResponseItem {
  id: string
  name: string
  serviceComponents: {
    id: string
    name: string
  }[]
  priceComponents: {
    id: string
    name: string
    billingType: string
    priceWithoutVat: string
    validFrom: string
    externalReferenceNumber: string
    powermeterType: string
  }[]
}

export interface ProductDetail {
  id: string
  name: string
  serviceComponents: {
    id: string
    name: string
    feature: string
  }[]
  priceComponents: ProductPriceComponent[]
}

export interface ProductUpsert {
  name: string
  serviceComponents: string[]
}

export interface ProductList {
  productList: ProductItem[]
}

export interface ProductResponseList {
  productList: ProductResponseItem[]
}

export const emptyProductUpsert: ProductUpsert = {
  name: "",
  serviceComponents: [],
}

export interface ProductPriceComponentUpsert {
  name: string
  externalReferenceNumber: string
  billingType: BillingType
  powermeterType?: PowerMeterType
  priceWithoutVat: string
  validFrom: number
  validUntil: number
}

export const draftProductPriceComponentUpsert: ProductPriceComponentUpsert = {
  name: "",
  externalReferenceNumber: "",
  billingType: BillingType.MONTHLY_FEE,
  priceWithoutVat: "",
  validFrom: -1,
  validUntil: -1,
}
