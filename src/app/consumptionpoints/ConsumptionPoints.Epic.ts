import {
  createConsumptionPoint,
  deactivateConsumptionPoint,
  deleteConsumptionPoint,
  getConsumptionPointById,
  getConsumptionPointPricePackages,
  getConsumptionPoints,
  getConsumptionPointUpdateById,
  moveOutConsumptionPointParticipant,
  moveInConsumptionPointParticipantExisting,
  updateConsumptionPoint,
} from "../../domain/consumptionpoints/ConsumptionPoints.Repository"
import {
  ConsumptionPointDetailItem,
  ConsumptionPointPricePackage,
  ConsumptionPointsList,
  ConsumptionPointUpsert,
} from "../../domain/consumptionpoints/ConsumptionPoints.Model"
import { ConsumptionPointParticipationsData } from "../../domain/participant/Participant.Model"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"
import {
  getConsumptionPointParticipations,
  deleteConsumptionPointParticipation,
} from "../../domain/consumptionpoints/ConsumptionPointParticipant.Repository"

export enum ConsumptionPointsActionType {
  CONSUMPTION_POINTS_GET_BY_ID = "CONSUMPTION_POINTS_GET_BY_ID",
  CONSUMPTION_POINTS_LIST_GET = "CONSUMPTION_POINTS_LIST_GET",
  CONSUMPTION_POINTS_GET_PARTICIPATIONS = "CONSUMPTION_POINTS_GET_PARTICIPATIONS",
  CONSUMPTION_POINTS_DELETE_PARTICIPATION_BY_ID = "CONSUMPTION_POINTS_DELETE_PARTICIPATION_BY_ID",
  CONSUMPTION_POINT_GET_UPDATE_BY_ID = "CONSUMPTION_POINT_GET_UPDATE_BY_ID",
  CONSUMPTION_POINT_UPDATE = "CONSUMPTION_POINT_UPDATE",
  CONSUMPTION_POINT_DEACTIVATE_BY_ID = "CONSUMPTION_POINT_DEACTIVATE_BY_ID",
  CONSUMPTION_POINT_DELETE_BY_ID = "CONSUMPTION_POINT_DELETE_BY_ID",
  CONSUMPTION_POINT_CREATE = "CONSUMPTION_POINT_CREATE",
  CONSUMPTION_POINT_GET_FORM_OPTIONS = "CONSUMPTION_POINT_GET_FORM_OPTIONS",
  CONSUMPTION_POINT_PARTICIPATION_MOVE_OUT = "CONSUMPTION_POINT_PARTICIPATION_MOVE_OUT",
  CONSUMPTION_POINT_PARTICIPATION_MOVE_IN = "CONSUMPTION_POINT_PARTICIPATION_MOVE_IN",
}

export const consumptionPointsEpics = [
  createEpic<ConsumptionPointDetailItem>(ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_BY_ID, (action) =>
    getConsumptionPointById(action.buildingId, action.consumptionPointId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ConsumptionPointsList>(ConsumptionPointsActionType.CONSUMPTION_POINTS_LIST_GET, () =>
    getConsumptionPoints(DOMAIN_DEPENDENCIES),
  ),
  createEpic<ConsumptionPointParticipationsData>(
    ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_PARTICIPATIONS,
    (action) => getConsumptionPointParticipations(action.consumptionPointId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ConsumptionPointsActionType.CONSUMPTION_POINTS_DELETE_PARTICIPATION_BY_ID, (action) =>
    deleteConsumptionPointParticipation(action.consumptionPointId, action.participationId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ConsumptionPointUpsert>(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_UPDATE_BY_ID, (action) =>
    getConsumptionPointUpdateById(action.consumptionPointId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ConsumptionPointsActionType.CONSUMPTION_POINT_UPDATE, (action) =>
    updateConsumptionPoint(action.consumptionPointId, action.update, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ConsumptionPointsActionType.CONSUMPTION_POINT_DEACTIVATE_BY_ID, (action) =>
    deactivateConsumptionPoint(action.consumptionPointId, action.fromDate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ConsumptionPointsActionType.CONSUMPTION_POINT_DELETE_BY_ID, (action) =>
    deleteConsumptionPoint(action.consumptionPointId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ConsumptionPointsActionType.CONSUMPTION_POINT_CREATE, (action) =>
    createConsumptionPoint(action.buildingId, action.consumptionPoint, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ConsumptionPointPricePackage[]>(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_FORM_OPTIONS, (action) =>
    getConsumptionPointPricePackages(action.buildingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_OUT, (action) =>
    moveOutConsumptionPointParticipant(
      action.consumptionPointId,
      action.participationId,
      action.consumptionPointMoveOut,
      DOMAIN_DEPENDENCIES,
    ),
  ),
  createEpic<boolean>(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_IN, (action) =>
    moveInConsumptionPointParticipantExisting(
      action.consumptionPointId,
      action.participationId,
      action.consumptionPointMoveIn,
      DOMAIN_DEPENDENCIES,
    ),
  ),
]
