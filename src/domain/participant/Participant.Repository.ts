import { from, map, mergeMap, Observable } from "rxjs"
import { ParticipantGpType, ParticipantPersonalDataSalutationEnum } from "../../data/generated-sources/openapi"
import { apiCall, apiHeaders, fileAttachmentDownload, fileAttachmentName } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { DomainResponse } from "../Domain.Response"

import { ParticipantZevList, ParticipantDetail, ParticipantUpsert } from "./Participant.Model"
import { participantDetailsMapper, participantUpdateMapper } from "./Participants.Mapper"

export const getParticipantsByZevId = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ParticipantZevList>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminZevApi.adminGetZevParticipants(zevId, authHeaders)).pipe(
      map((multiZevParticipantResponse) => ({
        participants: multiZevParticipantResponse.data.elements.map((participant) => ({
          id: participant.id,
          synchronised: participant.syncStatus,
          firstName: participant.personalData.firstName,
          lastName: participant.personalData.lastName,
          gpNumber: participant.sapGp ?? "-",
          email: participant.contactDetails.email ?? "-",
        })),
      })),
    ),
  )
}

export const getParticipantById = (
  participantId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ParticipantDetail>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminParticipantsApi.adminGetParticipantById(participantId, authHeaders)).pipe(
      mergeMap((participant) =>
        from(deps.adminZevApi.adminGetZevById(participant.data.zevId, authHeaders)).pipe(
          map((zev) => participantDetailsMapper(participant.data, zev.data, deps)),
        ),
      ),
    ),
  )
}

export const getParticipantUpdateById = (
  participantId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ParticipantUpsert>> => {
  return apiCall(
    from(deps.adminParticipantsApi.adminGetParticipantById(participantId, apiHeaders(deps))).pipe(
      map((participant) => participantUpdateMapper(participant.data)),
    ),
  )
}

export const updateParticipant = (
  participantId: string,
  participantUpdate: ParticipantUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminParticipantsApi.adminUpdateParticipantById(
        participantId,
        {
          sapGp: participantUpdate.businessPartnerName,
          gpType: ParticipantGpType[participantUpdate.businessPartnerType as keyof typeof ParticipantGpType],
          personalData: {
            salutation:
              ParticipantPersonalDataSalutationEnum[
                participantUpdate.salutation as keyof typeof ParticipantPersonalDataSalutationEnum
              ],
            title: participantUpdate.title,
            firstName: participantUpdate.firstName,
            lastName: participantUpdate.lastName,
            firstNameSecondPerson: participantUpdate.firstNameSecondPerson,
            lastNameSecondPerson: participantUpdate.lastNameSecondPerson,
          },
          contactDetails: {
            email: participantUpdate.contactEmail,
            phone: participantUpdate.contactTelephone,
            mobile: participantUpdate.contactMobile,
          },
          domicileAddress: {
            city: participantUpdate.addressCity,
            postCode: participantUpdate.addressPostCode,
            houseNumber: participantUpdate.addressHouseNumber,
            street: participantUpdate.addressStreet,
            land: participantUpdate.addressCountry,
            co: participantUpdate.addressCO,
            poBox: participantUpdate.addressPostBox,
          },
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const createParticipant = (zevId: string, participantCreate: ParticipantUpsert, deps: DomainDependencies) => {
  return apiCall(
    from(
      deps.adminZevApi.adminCreateZevParticipant(
        zevId,
        {
          sapGp: participantCreate.businessPartnerName,
          gpType: ParticipantGpType[participantCreate.businessPartnerType as keyof typeof ParticipantGpType],
          personalData: {
            salutation:
              ParticipantPersonalDataSalutationEnum[
                participantCreate.salutation as keyof typeof ParticipantPersonalDataSalutationEnum
              ],
            title: participantCreate.title,
            firstName: participantCreate.firstName,
            lastName: participantCreate.lastName,
            firstNameSecondPerson: participantCreate.firstNameSecondPerson,
            lastNameSecondPerson: participantCreate.lastNameSecondPerson,
          },
          contactDetails: {
            email: participantCreate.contactEmail,
            phone: participantCreate.contactTelephone,
            mobile: participantCreate.contactMobile,
          },
          domicileAddress: {
            city: participantCreate.addressCity,
            postCode: participantCreate.addressPostCode,
            houseNumber: participantCreate.addressHouseNumber,
            street: participantCreate.addressStreet,
            land: participantCreate.addressCountry,
            co: participantCreate.addressCO,
            poBox: participantCreate.addressPostBox,
          },
        },
        apiHeaders(deps),
      ),
    ).pipe(map((url) => url.data.split("/").pop() ?? "")),
  )
}

export const syncParticipant = (participantId: string, deps: DomainDependencies) => {
  return apiCall(
    from(deps.adminParticipantsApi.adminConfirmSapSyncParticipantById(participantId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const deleteParticipant = (participantId: string, deps: DomainDependencies) => {
  return apiCall(
    from(deps.adminParticipantsApi.adminDeleteParticipantById(participantId, apiHeaders(deps))).pipe(map(() => true)),
  )
}

export const getAllParticipantZevCsv = (zevId: string, deps: DomainDependencies) => {
  return apiCall(
    from(deps.adminParticipantDetailCsvApi.apiAdminV1ZevsZevIdParticipantCsvGet(zevId, apiHeaders(deps))).pipe(
      map((csv) => {
        fileAttachmentDownload(fileAttachmentName(csv.headers), new Blob([csv.data]))
        return true
      }),
    ),
  )
}
