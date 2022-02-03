import { endOfDay, startOfDay } from "date-fns"
import {
  Participation,
  ParticipantResponse,
  MultiParticipationAdminResponse,
  MultiZevParticipantResponse,
} from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"
import { appFormattedDate, apiFormattedDateToTimestamp } from "../Domain.Formatters"
import { ConsumptionPointParticipationItem, ConsumptionPointParticipationsData } from "../participant/Participant.Model"
import { formatPersonalFullName } from "../profiles/Profiles.Formatters"

const mapConsumptionPointParticipation = (
  participation: Participation,
  participant: ParticipantResponse | undefined,
  deps: DomainDependencies,
): ConsumptionPointParticipationItem => {
  const currentDate = new Date()
  return {
    id: participation.id,
    moveInDate: appFormattedDate(participation.moveInDate, deps),
    nextMoveInDate: new Date(participation.moveInDate).getTime(),
    nextMoveOutDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getTime(),
    sortableMoveInDate: apiFormattedDateToTimestamp(participation.moveInDate),
    moveOutDate: participation.moveOutDate ? appFormattedDate(participation.moveOutDate, deps) : undefined,
    sortableMoveOutDate: apiFormattedDateToTimestamp(participation.moveOutDate),
    participant: participant && {
      id: participant.id,
      fullName: formatPersonalFullName(participant.personalData, deps),
    },
  }
}

export const consumptionPointsParticipationDataMapper = (
  participationsResponse: MultiParticipationAdminResponse,
  participantsReponse: MultiZevParticipantResponse,
  deps: DomainDependencies,
): ConsumptionPointParticipationsData => {
  const currentParticipation = getCurrentParticipation(sortParticipations(participationsResponse.elements))
  const currentParticipant = participantsReponse.elements.find(
    (participant) => participant.id === currentParticipation?.participantId,
  )
  return {
    currentParticipation: currentParticipation
      ? mapConsumptionPointParticipation(currentParticipation, currentParticipant, deps)
      : undefined,
    participations: participationsResponse.elements.map((participation) => {
      const participant = participantsReponse.elements.find(
        (participant) => participant.id === participation.participantId,
      )
      return mapConsumptionPointParticipation(participation, participant, deps)
    }),
  }
}

const getCurrentParticipation = (sortedParticipations: Participation[]) => {
  return (
    sortedParticipations.find((participation) => {
      const now = Date.now()
      if (participation) {
        const moveInDate = startOfDay(new Date(participation.moveInDate))
        const moveOutDate = participation.moveOutDate && endOfDay(new Date(participation.moveOutDate))
        return now >= moveInDate.getTime() && (!moveOutDate || now < moveOutDate.getTime())
      }
      return false
    }) ?? undefined
  )
}

const sortParticipations = (participations: Participation[]) => {
  return participations.sort(
    (participationA, participationB) =>
      new Date(participationA.moveInDate).getTime() - new Date(participationB.moveInDate).getTime(),
  )
}
