import { of, forkJoin, from, mergeMap, map } from "rxjs"
import { PowerMeterParameters } from "../../../data/generated-sources/openapi"
import { DomainDependencies } from "../../Domain.Dependencies"

export const getParticipantBillingPowerParameters = (
  powerMeterParameters: PowerMeterParameters[],
  deps: DomainDependencies,
  authHeaders: { headers: { Authorization: string } },
) => {
  if (powerMeterParameters.length === 0) return of([])
  return forkJoin(
    powerMeterParameters.map((powerMeterParameter) =>
      getParticipantBillingPowerParameter(powerMeterParameter, deps, authHeaders),
    ),
  )
}

export const getParticipantBillingPowerParameter = (
  powerMeterParameter: PowerMeterParameters,
  deps: DomainDependencies,
  authHeaders: { headers: { Authorization: string } },
) => {
  return from(
    deps.adminConsumptionPointApi.adminGetConsumptionPointById(powerMeterParameter.consumptionPointId, authHeaders),
  ).pipe(
    mergeMap((consumptionPoint) =>
      from(
        deps.adminConsumptionPointApi.getAdminParticipationById(
          powerMeterParameter.consumptionPointId,
          powerMeterParameter.participationId ?? "",
          authHeaders,
        ),
      ).pipe(
        mergeMap((participation) =>
          from(
            deps.adminParticipantsApi.adminGetParticipantById(participation.data.participantId ?? "", authHeaders),
          ).pipe(
            mergeMap((participant) =>
              from(deps.adminBuildingApi.adminGetBuildingById(consumptionPoint.data.buildingId, authHeaders)).pipe(
                map((building) => ({
                  parent: powerMeterParameter,
                  consumptionPoint: consumptionPoint.data,
                  participant: participant.data,
                  building: building.data,
                })),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}
