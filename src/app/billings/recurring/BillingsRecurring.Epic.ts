import {
  BillingRecurringZevListItem,
  BillingsRecurringDetail,
  BillingsRecurringList,
} from "../../../domain/billings/recurring/BillingsRecurring.Model"
import {
  getRecurringBillingRunById,
  getRecurringBillings,
  createRecurringBillings,
  deleteRecurringBillingById,
  approveServiceBillingsRunById,
  sapSendServiceBillingsRunById,
  sapSendServiceBillingsById,
  recalculateServiceBillingById,
  cancelServiceBillingById,
  removeServiceBillingRunZevById,
  getBillingRecurringZevs,
} from "../../../domain/billings/recurring/BillingsRecurring.Repository"
import { DOMAIN_DEPENDENCIES } from "../../App.Config"
import { createEpic } from "../../Shared.Epic"

export enum BillingsRecurringActionType {
  BILLINGS_RECURRING_LIST_GET = "BILLINGS_RECURRING_LIST_GET",
  BILLINGS_RECURRING_GET_BY_ID = "BILLINGS_RECURRING_GET_BY_ID",
  BILLINGS_RECURRING_CREATE = "BILLINGS_RECURRING_CREATE",
  BILLINGS_RECURRING_DELETE_BY_ID = "BILLINGS_RECURRING_DELETE_BY_ID",
  BILLINGS_RECURRING_APPROVE_BY_ID = "BILLINGS_RECURRING_APPROVE_BY_ID",
  BILLINGS_RECURRING_SAP_SEND_ALL = "BILLINGS_RECURRING_SAP_SEND_ALL",
  BILLINGS_RECURRING_SAP_SEND_BY_ID = "BILLINGS_RECURRING_SAP_SEND_BY_ID",
  BILLINGS_RECURRING_RECALCULATE_BY_ID = "BILLINGS_RECURRING_RECALCULATE_BY_ID",
  BILLINGS_RECURRING_CANCEL_BY_ID = "BILLINGS_RECURRING_CANCEL_BY_ID",
  BILLINGS_RECURRING_RUN_REMOVE_BY_ID = "BILLINGS_RECURRING_RUN_REMOVE_BY_ID",
  BILLINGS_RECURRING_ZEVS_GET_LIST = "BILLINGS_RECURRING_ZEVS_GET_LIST",
  BILLINGS_SERVICES_EXPAND_ROW = "BILLINGS_SERVICES_EXPAND_ROW",
}

export const billingsRecurringEpic = [
  createEpic<BillingsRecurringList>(BillingsRecurringActionType.BILLINGS_RECURRING_LIST_GET, () =>
    getRecurringBillings(DOMAIN_DEPENDENCIES),
  ),
  createEpic<BillingsRecurringDetail>(BillingsRecurringActionType.BILLINGS_RECURRING_GET_BY_ID, (action) =>
    getRecurringBillingRunById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<BillingRecurringZevListItem[]>(BillingsRecurringActionType.BILLINGS_RECURRING_ZEVS_GET_LIST, () =>
    getBillingRecurringZevs(DOMAIN_DEPENDENCIES),
  ),
  createEpic<string>(BillingsRecurringActionType.BILLINGS_RECURRING_CREATE, (action) =>
    createRecurringBillings(action.billingsRecurringCreate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsRecurringActionType.BILLINGS_RECURRING_DELETE_BY_ID, (action) =>
    deleteRecurringBillingById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsRecurringActionType.BILLINGS_RECURRING_APPROVE_BY_ID, (action) =>
    approveServiceBillingsRunById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_ALL, (action) =>
    sapSendServiceBillingsRunById(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_BY_ID, (action) =>
    sapSendServiceBillingsById(action.serviceBillingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsRecurringActionType.BILLINGS_RECURRING_RECALCULATE_BY_ID, (action) =>
    recalculateServiceBillingById(action.serviceBillingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsRecurringActionType.BILLINGS_RECURRING_CANCEL_BY_ID, (action) =>
    cancelServiceBillingById(action.serviceBillingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsRecurringActionType.BILLINGS_RECURRING_RUN_REMOVE_BY_ID, (action) =>
    removeServiceBillingRunZevById(action.serviceBillingId, action.zevId, DOMAIN_DEPENDENCIES),
  ),
]
