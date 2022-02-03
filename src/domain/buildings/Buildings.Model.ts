import { ConsumptionPointAdminResponse, MultiParticipationAdminResponse } from "../../data/generated-sources/openapi"

import { StatusType } from "../Domain.Model"

export interface BuildingsList {
  buildings: BuildingListItem[]
}

export interface BuildingListItem {
  id: string
  statusType: StatusType
  buildingObject: string
  address: string
  zevId: string
  zevName: string
}

export interface BuilingConsumptionPoint {
  id: string
  statusType: StatusType
  name: string
  type: string
  powerMeterType: string
  subscriberName: string
}

export interface BuildingDetail {
  id: string
  name: string
  statusType: StatusType
  addressStreet: string
  addressCity: string
  zevId: string
  zevName: string
  consumptionPoints: BuilingConsumptionPoint[]
}

export interface ConsumptionPointParticipations {
  value: ConsumptionPointAdminResponse
  participations: MultiParticipationAdminResponse
}

export interface BuildingsZevList {
  buildings: BuildingZevListItem[]
}

export interface BuildingZevListItem {
  id: string
  statusType: StatusType
  buildingObject: string
  street: string
  city: string
}

export interface BuildingUpsert {
  statusType: StatusType
  buildingObject: string
  addressStreet: string
  addressHouseNumber: string
  addressPostCode: string
  addressCity: string
}

export const initialBuilding = {
  statusType: StatusType.DRAFT,
  buildingObject: "",
  addressStreet: "",
  addressHouseNumber: "",
  addressPostCode: "",
  addressCity: "",
}
