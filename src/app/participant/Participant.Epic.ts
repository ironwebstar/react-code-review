import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"
import { ParticipantDetail, ParticipantUpsert, ParticipantZevList } from "../../domain/participant/Participant.Model"
import {
  createParticipant,
  deleteParticipant,
  getParticipantById,
  getParticipantsByZevId,
  getParticipantUpdateById,
  syncParticipant,
  updateParticipant,
  getAllParticipantZevCsv,
} from "../../domain/participant/Participant.Repository"

export enum ParticipantActionType {
  PARTICIPANT_LIST_GET_BY_ZEV_ID = "PARTICIPANT_LIST_GET_BY_ZEV_ID",
  PARTICIPANT_GET_BY_ID = "PARTICIPANT_GET_BY_ID",
  PARTICIPANT_GET_UPDATE_BY_ID = "PARTICIPANT_GET_UPDATE_BY_ID",
  PARTICIPANT_UPDATE = "PARTICIPANT_UPDATE",
  PARTICIPANT_CREATE = "PARTICIPANT_CREATE",
  PARTICIPANT_SYNC = "PARTICIPANT_SYNC",
  PARTICIPANT_DELETE = "PARTICIPANT_DELETE",
  PARTICIPANT_DOWNLOAD = "PARTICIPANT_DOWNLOAD",
}

export const participantEpic = [
  createEpic<ParticipantZevList>(ParticipantActionType.PARTICIPANT_LIST_GET_BY_ZEV_ID, (action) =>
    getParticipantsByZevId(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ParticipantDetail>(ParticipantActionType.PARTICIPANT_GET_BY_ID, (action) =>
    getParticipantById(action.participantId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ParticipantUpsert>(ParticipantActionType.PARTICIPANT_GET_UPDATE_BY_ID, (action) =>
    getParticipantUpdateById(action.participantId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ParticipantActionType.PARTICIPANT_UPDATE, (action) =>
    updateParticipant(action.participantId, action.update, DOMAIN_DEPENDENCIES),
  ),
  createEpic<string>(ParticipantActionType.PARTICIPANT_CREATE, (action) =>
    createParticipant(action.zevId, action.create, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ParticipantActionType.PARTICIPANT_SYNC, (action) =>
    syncParticipant(action.participantId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ParticipantActionType.PARTICIPANT_DELETE, (action) =>
    deleteParticipant(action.participantId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ParticipantActionType.PARTICIPANT_DOWNLOAD, (action) =>
    getAllParticipantZevCsv(action.zevId, DOMAIN_DEPENDENCIES),
  ),
]
