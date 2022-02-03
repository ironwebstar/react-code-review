export interface ServiceComponentsList {
  serviceComponents: ServiceComponentListItem[]
}

export interface ServiceComponentListItem {
  id: string
  name: string
  feature: ServiceComponentFeature
}

export interface ServiceComponentsDetailItem {
  id: string
  name: string
}

export enum ServiceComponentFeature {
  COLLECTION = "COLLECTION",
  POWERMETER_READING = "POWERMETER_READING",
  ZEV_PARTICIPANT_BILLING = "ZEV_PARTICIPANT_BILLING",
  ZEV_PARTICIPANT_MANAGEMENT = "ZEV_PARTICIPANT_MANAGEMENT",
}
