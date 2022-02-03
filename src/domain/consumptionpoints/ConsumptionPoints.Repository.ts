import { from, Observable } from "rxjs"
import { map, mergeMap } from "rxjs/operators"
import { PowerMeterType as PowerMeterTypeAPI } from "../../data/generated-sources/openapi"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { DomainResponse } from "../Domain.Response"
import {
  ConsumptionPointsList,
  ConsumptionPointDetailItem,
  ConsumptionPointUpsert,
  ConsumptionPointType,
  ConsumptionPointPricePackage,
  ConsumptionPointMoveOut,
  ConsumptionPointMoveOutType,
  ConsumptionPointMoveIn,
} from "./ConsumptionPoints.Model"
import {
  consumptionPointsListMapper,
  consumptionPointDetailMapper,
  consumptionPointUpsertMapper,
  consumptionPointPricePackageMapper,
} from "./ConsumptionPoints.Mapper"
import { timestampToApiFormattedDate } from "../Domain.Formatters"

export const getConsumptionPoints = (deps: DomainDependencies): Observable<DomainResponse<ConsumptionPointsList>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminConsumptionPointApi.adminGetConsumptionPoints(1, 10000, undefined, headers)).pipe(
      mergeMap((consumptionPointsResponse) =>
        from(deps.adminBuildingApi.adminGetBuildings(1, 10000, undefined, headers)).pipe(
          mergeMap((buildingsResponse) =>
            from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, headers)).pipe(
              map((zevsResponse) =>
                consumptionPointsListMapper(consumptionPointsResponse.data, buildingsResponse.data, zevsResponse.data),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}

export const getConsumptionPointById = (
  buildingId: string,
  consumptionPointId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ConsumptionPointDetailItem>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminConsumptionPointApi.adminGetConsumptionPointById(consumptionPointId, headers)).pipe(
      mergeMap((consumptionPointResponse) =>
        from(deps.adminBuildingApi.adminGetBuildingById(buildingId, headers)).pipe(
          mergeMap((buildingResponse) =>
            from(
              deps.adminConsumptionPointApi.adminGetParticipationsByConsumptionPointId(consumptionPointId, headers),
            ).pipe(
              mergeMap((consumptionPointParticipationsResponse) =>
                from(deps.adminZevApi.adminGetZevById(buildingResponse.data.zevId, headers)).pipe(
                  mergeMap((zevResponse) =>
                    from(
                      deps.adminParticipantsApi.adminGetParticipantBulkByIds(
                        {
                          ids: zevResponse.data.participants,
                        },
                        headers,
                      ),
                    ).pipe(
                      map((participantsResponse) =>
                        consumptionPointDetailMapper(
                          consumptionPointResponse.data,
                          buildingResponse.data,
                          consumptionPointParticipationsResponse.data,
                          zevResponse.data,
                          participantsResponse.data,
                          deps,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}

export const getConsumptionPointUpdateById = (
  consumptionPointId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ConsumptionPointUpsert>> => {
  return apiCall(
    from(deps.adminConsumptionPointApi.adminGetConsumptionPointById(consumptionPointId, apiHeaders(deps))).pipe(
      map((consumptionPointResponse) => consumptionPointUpsertMapper(consumptionPointResponse.data)),
    ),
  )
}

export const updateConsumptionPoint = (
  consumptionPointId: string,
  consumptionPointUpsert: ConsumptionPointUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminUpdateActiveConsumptionPointById(
        consumptionPointId,
        {
          name: consumptionPointUpsert.name,
          type: ConsumptionPointType[consumptionPointUpsert.type],
          billableFrom: timestampToApiFormattedDate(consumptionPointUpsert.billableFrom, deps),
          meterType: PowerMeterTypeAPI[consumptionPointUpsert.powerMeterType],
          meteringCode: consumptionPointUpsert.meteringCode,
          pricePackageId: consumptionPointUpsert.pricePackageId,
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const deactivateConsumptionPoint = (
  consumptionPointId: string,
  fromDate: number,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminDeactivateConsumptionPointById(
        consumptionPointId,
        timestampToApiFormattedDate(fromDate, deps),
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const getConsumptionPointPricePackages = (
  buildingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ConsumptionPointPricePackage[]>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminBuildingApi.adminGetBuildingById(buildingId, headers)).pipe(
      mergeMap((buildingResponse) =>
        from(deps.adminZevApi.adminGetZevById(buildingResponse.data.zevId, headers)).pipe(
          map((zevResponse) => consumptionPointPricePackageMapper(zevResponse.data)),
        ),
      ),
    ),
  )
}

export const createConsumptionPoint = (
  buildingId: string,
  consumptionPoint: ConsumptionPointUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminCreateConsumptionPointForBuilding(
        buildingId,
        {
          name: consumptionPoint.name,
          meterType: PowerMeterTypeAPI[consumptionPoint.powerMeterType],
          meteringCode: consumptionPoint.meteringCode,
          type: consumptionPoint.type,
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const deleteConsumptionPoint = (
  consumptionPointId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminConsumptionPointApi.adminDeleteConsumptionPointById(consumptionPointId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const moveOutConsumptionPointParticipant = (
  consumptionPointId: string,
  participationId: string,
  consumptionPointMoveOut: ConsumptionPointMoveOut,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  const { moveOutDate, moveOutType, existingParticipantId } = consumptionPointMoveOut
  switch (moveOutType) {
    case ConsumptionPointMoveOutType.EXISTING:
      return moveOutConsumptionPointParticipantExisting(
        consumptionPointId,
        participationId,
        existingParticipantId,
        moveOutDate,
        deps,
      )
    case ConsumptionPointMoveOutType.VACANCY:
    default:
      return moveOutConsumptionPointParticipantVacancy(consumptionPointId, participationId, moveOutDate, deps)
  }
}

export const moveInConsumptionPointParticipantExisting = (
  consumptionPointId: string,
  participationId: string,
  consumptionPointMoveIn: ConsumptionPointMoveIn,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  const { moveInDate, participantId } = consumptionPointMoveIn
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminMoveinParticipationExisting(
        consumptionPointId,
        participationId,
        {
          participantId,
          moveinDate: timestampToApiFormattedDate(moveInDate, deps),
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

const moveOutConsumptionPointParticipantExisting = (
  consumptionPointId: string,
  participationId: string,
  participantId: string,
  moveOutDate: number,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminMoveoutParticipationExisting(
        consumptionPointId,
        participationId,
        {
          participantId: participantId,
          moveinDateNewParticipant: timestampToApiFormattedDate(
            new Date(moveOutDate).setDate(new Date(moveOutDate).getDate() + 1),
            deps,
          ),
          moveoutDate: timestampToApiFormattedDate(moveOutDate, deps),
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

const moveOutConsumptionPointParticipantVacancy = (
  consumptionPointId: string,
  participationId: string,
  moveOutDate: number,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminMoveoutParticipationVacancy(
        consumptionPointId,
        participationId,
        {
          moveoutDate: timestampToApiFormattedDate(moveOutDate, deps),
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}
