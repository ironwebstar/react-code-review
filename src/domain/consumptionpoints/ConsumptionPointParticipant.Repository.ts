import { Observable, from, mergeMap, map } from "rxjs"
import { apiHeaders, apiCall } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { DomainResponse } from "../Domain.Response"
import { ConsumptionPointParticipationsData } from "../participant/Participant.Model"
import { consumptionPointsParticipationDataMapper } from "./ConsumptionPointParticipant.Mapper"

export const getConsumptionPointParticipations = (
  consumptionPointId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ConsumptionPointParticipationsData>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminGetParticipationsByConsumptionPointId(consumptionPointId, authHeaders),
    ).pipe(
      mergeMap((participationsResponse) => {
        const participantIds = participationsResponse.data.elements
          .map((e) => e.participantId)
          .filter((participantId) => participantId !== undefined) as string[]
        return from(deps.adminParticipantsApi.adminGetParticipantBulkByIds({ ids: participantIds }, authHeaders)).pipe(
          map((participantsReponse) =>
            consumptionPointsParticipationDataMapper(participationsResponse.data, participantsReponse.data, deps),
          ),
        )
      }),
    ),
  )
}

export const deleteConsumptionPointParticipation = (
  consumptionPointId: string,
  participationId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminConsumptionPointApi.adminParticipationStopMovein(consumptionPointId, participationId, apiHeaders(deps)),
    ).pipe(map(() => true)),
  )
}
