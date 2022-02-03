import {
  BuildingAdminResponse,
  ConsumptionPointAdminResponse,
  MultiParticipationAdminResponse,
  MultiZevParticipantResponse,
  PagedBuildingAdminResponse,
  PagedConsumptionPointAdminResponse,
  PagedZevAdminResponse,
  ZevAdminResponse,
} from "../../data/generated-sources/openapi"

import {
  ConsumptionPointDetailItem,
  ConsumptionPointPowerMeterType,
  ConsumptionPointPricePackage,
  ConsumptionPointsList,
  ConsumptionPointType,
  ConsumptionPointUpsert,
} from "./ConsumptionPoints.Model"
import { DomainDependencies } from "../Domain.Dependencies"
import { apiFormattedDateToTimestamp, appFormattedDate } from "../Domain.Formatters"
import { StatusType } from "../Domain.Model"
import { formatPersonalFullName } from "../profiles/Profiles.Formatters"

export const consumptionPointsListMapper = (
  consumptionPoints: PagedConsumptionPointAdminResponse,
  buildings: PagedBuildingAdminResponse,
  zevs: PagedZevAdminResponse,
): ConsumptionPointsList => {
  return {
    consumptionPoints: consumptionPoints.elements.map((consumptionPoint) => {
      const building = buildings.elements.find((b) => consumptionPoint.buildingId === b.id)
      const zev = !building ? undefined : zevs.elements.find((z) => z.id === building.zevId)
      const pricePackage = !zev ? undefined : zev.pricePackages?.find((pp) => pp.id === consumptionPoint.pricePackageId)

      return {
        id: consumptionPoint.id,
        name: consumptionPoint.name,
        statusType: StatusType[consumptionPoint.currentState],
        type: consumptionPoint.type,
        meterType: ConsumptionPointPowerMeterType[consumptionPoint.meterType],
        meteringCode: consumptionPoint.meteringCode,
        participations: consumptionPoint.participations,
        building: {
          id: consumptionPoint.buildingId,
          name: building?.name ?? "",
        },
        zev: {
          id: zev?.id ?? "",
          name: zev?.name ?? "",
        },
        pricePackage: {
          id: consumptionPoint.pricePackageId,
          name: pricePackage?.name ?? "",
        },
      }
    }),
  }
}

export const consumptionPointDetailMapper = (
  consumptionPointResponse: ConsumptionPointAdminResponse,
  buildingResponse: BuildingAdminResponse,
  consumptionPointParticipationsResponse: MultiParticipationAdminResponse,
  zevResponse: ZevAdminResponse,
  participantsResponse: MultiZevParticipantResponse,
  deps: DomainDependencies,
): ConsumptionPointDetailItem => {
  const pricePackage = zevResponse.pricePackages?.find((pp) => pp.id === consumptionPointResponse.pricePackageId)
  return {
    id: consumptionPointResponse.id,
    name: consumptionPointResponse.name,
    statusType: StatusType[consumptionPointResponse.currentState],
    type: consumptionPointResponse.type ?? "",
    powerMeterType: consumptionPointResponse.meterType,
    buildingName: buildingResponse.name ?? "",
    buildingId: buildingResponse.id,
    zevId: buildingResponse.zevId,
    currentPricePackageName: pricePackage?.name ?? "",
    meteringCode: consumptionPointResponse.meteringCode,
    billableFrom: appFormattedDate(consumptionPointResponse.billableFrom, deps),
    billableTo: appFormattedDate(consumptionPointResponse.billableTo, deps),
    participations: consumptionPointParticipationsResponse.elements.length,
    participants: participantsResponse.elements.map((participant) => ({
      id: participant.id,
      fullName: formatPersonalFullName(participant.personalData, deps),
    })),
  }
}

export const consumptionPointPricePackageMapper = (zevResponse: ZevAdminResponse): ConsumptionPointPricePackage[] => {
  return (
    zevResponse.pricePackages
      ?.map((pricePackage) => ({
        id: pricePackage.id,
        name: pricePackage.name,
        order: pricePackage.order,
      }))
      .sort((p1, p2) => (p1.order > p2.order ? 1 : -1)) ?? []
  )
}

export const consumptionPointUpsertMapper = (
  consumptionPointResponse: ConsumptionPointAdminResponse,
): ConsumptionPointUpsert => {
  return {
    id: consumptionPointResponse.id,
    name: consumptionPointResponse.name,
    type: consumptionPointResponse.type ?? ConsumptionPointType.RESIDENCE,
    statusType: StatusType[consumptionPointResponse.currentState],
    powerMeterType: ConsumptionPointPowerMeterType[consumptionPointResponse.meterType],
    meteringCode: consumptionPointResponse.meteringCode,
    pricePackageId: consumptionPointResponse.pricePackageId,
    billableFrom: apiFormattedDateToTimestamp(consumptionPointResponse.billableFrom),
    billableTo: apiFormattedDateToTimestamp(consumptionPointResponse.billableTo),
  }
}
