import { DomainDependencies } from "../Domain.Dependencies"
import { forkJoin, from, map, mergeMap, Observable, of } from "rxjs"
import { DomainResponse } from "../Domain.Response"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { BuildingDetail, BuildingsList, BuildingsZevList, BuildingUpsert } from "./Buildings.Model"
import { buildingDetailMapper, buildingsListMapper, buildingsZevListMapper } from "./Buildings.Mapper"
import { StatusType } from "../Domain.Model"
import { timestampToApiFormattedDate } from "../Domain.Formatters"

export const getBuildings = (deps: DomainDependencies): Observable<DomainResponse<BuildingsList>> => {
  return apiCall(
    from(deps.adminBuildingApi.adminGetBuildings(1, 10000, undefined, apiHeaders(deps))).pipe(
      mergeMap((buildingsResponse) =>
        from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, apiHeaders(deps))).pipe(
          map((zevResponse) => buildingsListMapper(buildingsResponse.data, zevResponse.data)),
        ),
      ),
    ),
  )
}

export const getBuildingById = (
  zevId: string,
  buildingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BuildingDetail>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminBuildingApi.adminGetBuildingById(buildingId, headers)).pipe(
      mergeMap((buildingsResponse) =>
        from(deps.adminZevApi.adminGetZevById(zevId, headers)).pipe(
          mergeMap((zevResponse) =>
            from(deps.adminZevApi.adminGetZevParticipants(zevId, headers)).pipe(
              mergeMap((zevParticipantsResponse) =>
                getConsumptionPointsWithParticipations(buildingsResponse.data.consumptionPoints, deps).pipe(
                  map((consumptionPoints) =>
                    buildingDetailMapper(
                      buildingsResponse.data,
                      zevResponse.data,
                      zevParticipantsResponse.data,
                      consumptionPoints,
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
  )
}

export const getConsumptionPointsWithParticipations = (consumptionPointIds: string[], deps: DomainDependencies) => {
  const headers = apiHeaders(deps)
  if (consumptionPointIds.length === 0) return of([])
  return forkJoin(
    consumptionPointIds.map((consumptionPointId) =>
      from(deps.adminConsumptionPointApi.adminGetConsumptionPointById(consumptionPointId, headers)).pipe(
        mergeMap((consumptionPoint) =>
          from(
            deps.adminConsumptionPointApi.adminGetParticipationsByConsumptionPointId(consumptionPoint.data.id, headers),
          ).pipe(
            map((participations) => ({
              value: consumptionPoint.data,
              participations: participations.data,
            })),
          ),
        ),
      ),
    ),
  )
}

export const getBuildingsByZevId = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BuildingsZevList>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminBuildingApi.adminGetBuildings(1, 10000, undefined, authHeaders)).pipe(
      map((buildingsResponse) => buildingsZevListMapper(buildingsResponse.data, zevId)),
    ),
  )
}

export const createBuilding = (zevId: string, buildingUpsert: BuildingUpsert, deps: DomainDependencies) => {
  return apiCall(
    from(
      deps.adminBuildingApi.adminCreateBuildingForZev(
        zevId,
        {
          name: buildingUpsert.buildingObject,
          address: {
            street: buildingUpsert.addressStreet,
            houseNumber: buildingUpsert.addressHouseNumber,
            postalCode: buildingUpsert.addressPostCode,
            city: buildingUpsert.addressCity,
          },
        },
        apiHeaders(deps),
      ),
    ).pipe(map((url) => url.data.split("/").pop() ?? "")),
  )
}

export const updateBuilding = (buildingId: string, buildingUpsert: BuildingUpsert, deps: DomainDependencies) => {
  return apiCall(
    from(
      deps.adminBuildingApi.adminUpdateBuildingById(
        buildingId,
        {
          name: buildingUpsert.buildingObject,
          address: {
            street: buildingUpsert.addressStreet,
            houseNumber: buildingUpsert.addressHouseNumber,
            postalCode: buildingUpsert.addressPostCode,
            city: buildingUpsert.addressCity,
          },
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const getBuildingUpdateById = (
  buildingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BuildingUpsert>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminBuildingApi.adminGetBuildingById(buildingId, headers)).pipe(
      map((buildingsResponse) => ({
        statusType: StatusType[buildingsResponse.data.currentState],
        buildingObject: buildingsResponse.data.name ?? "",
        addressStreet: buildingsResponse.data.address.street,
        addressHouseNumber: buildingsResponse.data.address.houseNumber,
        addressPostCode: buildingsResponse.data.address.postalCode,
        addressCity: buildingsResponse.data.address.city,
      })),
    ),
  )
}

export const deactivateBuilding = (buildingId: string, fromDate: number, deps: DomainDependencies) => {
  return apiCall(
    from(
      deps.adminBuildingApi.adminDeactivateBuildingById(
        buildingId,
        timestampToApiFormattedDate(fromDate, deps),
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const deleteBuilding = (buildingId: string, deps: DomainDependencies) => {
  return apiCall(from(deps.adminBuildingApi.adminDeleteBuilding(buildingId, apiHeaders(deps))).pipe(map(() => true)))
}
