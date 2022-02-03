import { BillingsInitialDetail, BillingsInitialList } from "../../../domain/billings/initial/BillingsInitial.Model"
import {
  approveInitialBillingById,
  cancelInitialBillingById,
  deleteInitialBillingById,
  getInitialBillingById,
  getInitialBillings,
  recalculateInitialBillingById,
  submitInitialBillingToSAP,
} from "../../../domain/billings/initial/BillingsInitial.Repository"
import { DOMAIN_DEPENDENCIES } from "../../App.Config"
import { createEpic } from "../../Shared.Epic"

export enum BillingsInitialActionType {
  BILLINGS_INITIAL_LIST_GET = "BILLINGS_INITIAL_LIST_GET",
  BILLINGS_INITIAL_GET_BY_ID = "BILLINGS_INITIAL_GET_BY_ID",
  BILLINGS_INITIAL_RECALCULATE = "BILLINGS_INITIAL_RECALCULATE",
  BILLINGS_INITIAL_APPROVE_BY_ID = "BILLINGS_INITIAL_APPROVE_BY_ID",
  BILLINGS_INITIAL_CANCEL_BY_ID = "BILLINGS_INITIAL_CANCEL_BY_ID",
  BILLINGS_INITIAL_SUBMIT_TO_SAP = "BILLINGS_INITIAL_SUBMIT_TO_SAP",
  BILLINGS_INITIAL_DELETE_BY_ID = "BILLINGS_INITIAL_DELETE_BY_ID",
}

export const billingsInitialEpic = [
  createEpic<BillingsInitialList>(BillingsInitialActionType.BILLINGS_INITIAL_LIST_GET, () =>
    getInitialBillings(DOMAIN_DEPENDENCIES),
  ),
  createEpic<BillingsInitialDetail>(BillingsInitialActionType.BILLINGS_INITIAL_GET_BY_ID, (action) =>
    getInitialBillingById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsInitialActionType.BILLINGS_INITIAL_RECALCULATE, (action) =>
    recalculateInitialBillingById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsInitialActionType.BILLINGS_INITIAL_APPROVE_BY_ID, (action) =>
    approveInitialBillingById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsInitialActionType.BILLINGS_INITIAL_CANCEL_BY_ID, (action) =>
    cancelInitialBillingById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsInitialActionType.BILLINGS_INITIAL_SUBMIT_TO_SAP, (action) =>
    submitInitialBillingToSAP(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsInitialActionType.BILLINGS_INITIAL_DELETE_BY_ID, (action) =>
    deleteInitialBillingById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
]
