import {
  BuildingAdminResponse,
  MultiParticipationAdminResponse,
  MultiZevParticipantResponse,
  PagedBuildingAdminResponse,
  PagedZevAdminResponse,
  ZevAdminResponse,
} from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"
import { StatusType } from "../Domain.Model"
import { formatPersonalFullName } from "../profiles/Profiles.Formatters"
import {
  BuildingDetail,
  BuildingsList,
  BuildingsZevList,
  ConsumptionPointParticipations,
  BuildingListItem,
} from "./Buildings.Model"

export const mapBuildingListItem = (building: BuildingAdminResponse, zevs: ZevAdminResponse[]): BuildingListItem => {
  const zev = zevs.find((z) => z.id === building.zevId)
  return {
    id: building.id,
    statusType: StatusType[building.currentState],
    buildingObject: building.name ?? "",
    address:
      `${building.address.street} ${building.address.houseNumber} ` +
      `${building.address.postalCode} ${building.address.city}`,
    zevId: zev?.id ?? "",
    zevName: zev?.name ?? "",
  }
}

export const buildingsListMapper = (
  buildings: PagedBuildingAdminResponse,
  zevs: PagedZevAdminResponse,
): BuildingsList => {
  return {
    buildings: buildings.elements.map((building) => mapBuildingListItem(building, zevs.elements)),
  }
}

export const buildingDetailMapper = (
  buildingAdminResponse: BuildingAdminResponse,
  zevAdminResponse: ZevAdminResponse,
  zevParticipants: MultiZevParticipantResponse,
  consumptionPointAdminResponse: ConsumptionPointParticipations[],
  deps: DomainDependencies,
): BuildingDetail => {
  return {
    id: buildingAdminResponse.id,
    name: buildingAdminResponse.name ?? "",
    statusType: StatusType[buildingAdminResponse.currentState],
    addressStreet: `${buildingAdminResponse.address.street} ${buildingAdminResponse.address.houseNumber}`,
    addressCity: `${buildingAdminResponse.address.postalCode} ${buildingAdminResponse.address.city}`,
    zevId: zevAdminResponse.id,
    zevName: zevAdminResponse.name,
    consumptionPoints: consumptionPointAdminResponse.map((consumptionPoint) => ({
      id: consumptionPoint.value.id,
      statusType: StatusType[consumptionPoint.value.currentState],
      name: consumptionPoint.value.name,
      type: consumptionPoint.value.type ?? "",
      powerMeterType: consumptionPoint.value.meterType,
      subscriberName: subscriberNameMapper(consumptionPoint.participations, zevParticipants, deps),
    })),
  }
}

export const subscriberNameMapper = (
  consumptionPointParticipations: MultiParticipationAdminResponse,
  zevParticipants: MultiZevParticipantResponse,
  deps: DomainDependencies,
) => {
  const participants = zevParticipants.elements.filter((zevParticipant) =>
    consumptionPointParticipations.elements.find((participation) => zevParticipant.id === participation.participantId),
  )

  const formattedParticipant = participants
    .map((participant) => formatPersonalFullName(participant.personalData, deps))
    .pop()

  if (!formattedParticipant) return ""
  return formattedParticipant
}

export const buildingsZevListMapper = (buildings: PagedBuildingAdminResponse, zevId: string): BuildingsZevList => {
  return {
    buildings: buildings.elements
      .filter((building) => building.zevId === zevId)
      .map((building) => {
        return {
          id: building.id,
          statusType: StatusType[building.currentState],
          buildingObject: building.name ?? "",
          street: `${building.address.street} ${building.address.houseNumber}`,
          city: `${building.address.postalCode} ${building.address.city}`,
        }
      }),
  }
}
