import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"
import { BuildingDetail, BuildingsList, BuildingsZevList, BuildingUpsert } from "../../domain/buildings/Buildings.Model"
import {
  createBuilding,
  deactivateBuilding,
  deleteBuilding,
  getBuildingById,
  getBuildings,
  getBuildingsByZevId,
  getBuildingUpdateById,
  updateBuilding,
} from "../../domain/buildings/Buildings.Repository"

export enum BuildingsActionType {
  BUILDINGS_LIST_GET = "BUILDINGS_LIST_GET",
  BUILDINGS_LIST_GET_BY_ZEV_ID = "BUILDINGS_LIST_GET_BY_ZEV_ID",
  BUILDINGS_GET_BY_ID = "BUILDINGS_GET_BY_ID",
  BUILDINGS_UPDATE = "BUILDINGS_UPDATE",
  BUILDINGS_GET_UPDATE_BY_ID = "BUILDINGS_GET_UPDATE_BY_ID",
  BUILDINGS_CREATE = "BUILDINGS_CREATE",
  BUILDINGS_DEACTIVATE = "BUILDINGS_DEACTIVATE",
  BUILDINGS_DELETE = "BUILDINGS_DELETE",
}

export const buildingsEpic = [
  createEpic<BuildingsList>(BuildingsActionType.BUILDINGS_LIST_GET, () => getBuildings(DOMAIN_DEPENDENCIES)),
  createEpic<BuildingsZevList>(BuildingsActionType.BUILDINGS_LIST_GET_BY_ZEV_ID, (action) =>
    getBuildingsByZevId(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<BuildingDetail>(BuildingsActionType.BUILDINGS_GET_BY_ID, (action) =>
    getBuildingById(action.zevId, action.buildingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BuildingsActionType.BUILDINGS_UPDATE, (action) =>
    updateBuilding(action.buildingId, action.update, DOMAIN_DEPENDENCIES),
  ),
  createEpic<BuildingUpsert>(BuildingsActionType.BUILDINGS_GET_UPDATE_BY_ID, (action) =>
    getBuildingUpdateById(action.buildingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<string>(BuildingsActionType.BUILDINGS_CREATE, (action) =>
    createBuilding(action.zevId, action.create, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BuildingsActionType.BUILDINGS_DEACTIVATE, (action) =>
    deactivateBuilding(action.buildingId, action.fromDate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BuildingsActionType.BUILDINGS_DELETE, (action) =>
    deleteBuilding(action.buildingId, DOMAIN_DEPENDENCIES),
  ),
]
