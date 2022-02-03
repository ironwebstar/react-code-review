import {
  PowerMeterParameters,
  ConsumptionPointAdminResponse,
  ParticipantResponse,
  BuildingAdminResponse,
} from "../../../data/generated-sources/openapi"

export interface BillingsParticipantPowerMeterParameter {
  parent: PowerMeterParameters
  consumptionPoint: ConsumptionPointAdminResponse
  participant: ParticipantResponse
  building: BuildingAdminResponse
}
