import { StatusType } from "../Domain.Model"
import { ConsumptionPointParticipant } from "../participant/Participant.Model"

export enum ConsumptionPointType {
  RESIDENCE = "RESIDENCE",
  BUSINESS = "BUSINESS",
  GENERAL_SUPPLY = "GENERAL_SUPPLY",
  HEATING_PUMP = "HEATING_PUMP",
}

export enum ConsumptionPointPowerMeterType {
  HOUSEHOLD_POWERMETER = "HOUSEHOLD_POWERMETER",
  HOUSEHOLD_POWERMETER_ON_RAILS = "HOUSEHOLD_POWERMETER_ON_RAILS",
  COMMERCIAL_POWERMETER_SMALL = "COMMERCIAL_POWERMETER_SMALL",
  COMMERCIAL_POWERMETER_LARGE = "COMMERCIAL_POWERMETER_LARGE",
}

export enum ConsumptionPointMoveOutType {
  EXISTING = "EXISTING",
  VACANCY = "VACANCY",
  NONE = "NONE",
}

export const consumptionPointTypeValues = Object.values(ConsumptionPointType)

export const consumptionPointPowerMeterTypeValues = Object.values(ConsumptionPointPowerMeterType)

export interface ConsumptionPointsListItem {
  id: string
  name: string
  statusType: StatusType
  type?: string
  meterType: string
  meteringCode: string
  participations: Array<string>
  building: {
    id: string
    name: string
  }
  zev: {
    id: string
    name: string
  }
  pricePackage: {
    id: number
    name: string
  }
}

export interface ConsumptionPointsList {
  consumptionPoints: ConsumptionPointsListItem[]
}

export interface ConsumptionPointDetailItem {
  id: string
  name: string
  statusType: StatusType
  type: string
  powerMeterType: string
  buildingName: string
  buildingId: string
  zevId: string
  currentPricePackageName: string
  meteringCode: string
  billableFrom: string
  billableTo: string
  participations: number
  participants: ConsumptionPointParticipant[]
}

export interface ConsumptionPointUpsertPricePackageOption {
  name: string
  id: number
  order: number
}

export interface ConsumptionPointUpsert {
  id: string
  name: string
  statusType: StatusType
  type: ConsumptionPointType
  billableFrom: number
  billableTo: number
  powerMeterType: ConsumptionPointPowerMeterType
  pricePackageId: number
  meteringCode: string
}

export const emptyConsumptionPointCreate: ConsumptionPointUpsert = {
  id: "",
  name: "",
  statusType: StatusType.DRAFT,
  type: ConsumptionPointType.RESIDENCE,
  billableFrom: 0,
  billableTo: 0,
  powerMeterType: ConsumptionPointPowerMeterType.HOUSEHOLD_POWERMETER,
  pricePackageId: 0,
  meteringCode: "",
}

export interface ConsumptionPointPricePackage {
  id: number
  name: string
  order: number
}

export interface ConsumptionPointMoveOut {
  moveOutDate: number
  moveOutType: ConsumptionPointMoveOutType
  existingParticipantId: string
}

export interface ConsumptionPointMoveIn {
  participantId: string
  moveInDate: number
}

export const emptyConsumptionPointMoveOut: ConsumptionPointMoveOut = {
  moveOutDate: -1,
  moveOutType: ConsumptionPointMoveOutType.NONE,
  existingParticipantId: "",
}

export const emptyConsumptionPointMoveIn: ConsumptionPointMoveIn = {
  participantId: "",
  moveInDate: -1,
}
