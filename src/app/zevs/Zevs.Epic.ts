import { ZevsList } from "../../domain/zevs/ZevsList.Model"
import {
  activateZevById,
  deactivateZevById,
  createZev,
  deleteZevById,
  getZevById,
  getZevs,
  getZevUpdateById,
  updateZev,
  getZevPrefillProfile,
  createInitialInvoiceByZevId,
  getInitialBillingsForZev,
  getRecurringBillingsForZev,
} from "../../domain/zevs/Zevs.Repository"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"
import { ZevDetail, ZevDetailBillingsList, ZevPrefillProfile } from "../../domain/zevs/ZevsDetail.Model"
import { ZevsUpsert } from "../../domain/zevs/ZevsUpsert.Model"

export enum ZevsActionType {
  ZEVS_GET_LIST = "ZEVS_GET_LIST",
  ZEVS_GET_BY_ID = "ZEVS_GET_BY_ID",
  ZEVS_CREATE = "ZEVS_CREATE",
  ZEVS_GET_UPDATE_BY_ID = "ZEVS_GET_UPDATE_BY_ID",
  ZEVS_UPDATE = "ZEVS_UPDATE",
  ZEVS_DELETE_BY_ID = "ZEVS_DELETE_BY_ID",
  ZEVS_ACTIVATE_BY_ID = "ZEVS_ACTIVATE_BY_ID",
  ZEVS_DEACTIVATE_BY_ID = "ZEVS_DEACTIVATE_BY_ID",
  ZEVS_GET_PROFILE_PREFILL = "ZEVS_GET_PROFILE_PREFILL",
  ZEVS_CREATE_INVOICE = "ZEVS_CREATE_INVOICE",
  ZEVS_DETAIL_INITIAL_SERVICE_INVOICE = "ZEVS_DETAIL_INITIAL_SERVICE_INVOICE",
  ZEVS_DETAIL_RECURRING_SERVICE_INVOICE = "ZEVS_DETAIL_RECURRING_SERVICE_INVOICE",
}

export const zevsEpics = [
  createEpic<ZevsList>(ZevsActionType.ZEVS_GET_LIST, () => getZevs(DOMAIN_DEPENDENCIES)),
  createEpic<string>(ZevsActionType.ZEVS_CREATE, (action) => createZev(action.zevCreate, DOMAIN_DEPENDENCIES)),
  createEpic<ZevDetail>(ZevsActionType.ZEVS_GET_BY_ID, (action) => getZevById(action.zevId, DOMAIN_DEPENDENCIES)),
  createEpic<ZevsUpsert>(ZevsActionType.ZEVS_GET_UPDATE_BY_ID, (action) =>
    getZevUpdateById(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ZevsActionType.ZEVS_UPDATE, (action) =>
    updateZev(action.zevId, action.zevUpdate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ZevsActionType.ZEVS_DELETE_BY_ID, (action) => deleteZevById(action.zevId, DOMAIN_DEPENDENCIES)),
  createEpic<boolean>(ZevsActionType.ZEVS_ACTIVATE_BY_ID, (action) =>
    activateZevById(action.zevId, action.billableFromDate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ZevsActionType.ZEVS_DEACTIVATE_BY_ID, (action) =>
    deactivateZevById(action.zevId, action.billableUntilDate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ZevPrefillProfile>(ZevsActionType.ZEVS_GET_PROFILE_PREFILL, (action) =>
    getZevPrefillProfile(action.profileId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<string>(ZevsActionType.ZEVS_CREATE_INVOICE, (action) =>
    createInitialInvoiceByZevId(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ZevDetailBillingsList>(ZevsActionType.ZEVS_DETAIL_INITIAL_SERVICE_INVOICE, (action) =>
    getInitialBillingsForZev(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ZevDetailBillingsList>(ZevsActionType.ZEVS_DETAIL_RECURRING_SERVICE_INVOICE, (action) =>
    getRecurringBillingsForZev(action.zevId, DOMAIN_DEPENDENCIES),
  ),
]
