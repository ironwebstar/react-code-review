import {
  BillingsParticipantDetail,
  BillingsParticipantFinalise,
  ZevServiceComponentFeaturesResponse,
} from "../../../domain/billings/participant/BillingsParticipant.Model"
import {
  getZevAllParticipantBillings,
  updateAllParticipantBillingPrices,
} from "../../../domain/billings/participant/BillingsAllParticipant.Repository"
import {
  downloadAllParticipantBillCsv,
  downloadAllParticipantBillPdf,
  downloadBillPdf,
  paidOrUnpaidBill,
} from "../../../domain/billings/participant/Bill.Repository"
import { DOMAIN_DEPENDENCIES } from "../../App.Config"
import { createEpic } from "../../Shared.Epic"
import {
  getParticipantBillingDetail,
  suspendParticipantBilling,
  unsuspendParticipantBilling,
  approveParticipantBilling,
  getParticipantBillingFinalise,
  reopenParticipantBilling,
  getZevServiceComponentFeatures,
  sendSapParticipantBillings,
} from "../../../domain/billings/participant/BillingsParticipant.Repository"
import { BillingsAllParticipantList } from "../../../domain/billings/participant/BillingsAllParticipant.Model"
import { getZevIndividualParticipantBillings } from "../../../domain/billings/participant/BillingsIndividualParticipant.Repository"
import { BillingsIndividualParticipantList } from "../../../domain/billings/participant/BillingsIndividualParticipant.Model"

export enum BillingsParticipantActionType {
  BILLINGS_ZEV_ALL_PARTICIPANT_LIST_GET = "BILLINGS_ZEV_ALL_PARTICIPANT_LIST_GET",
  BILLINGS_ZEV_INDIVIDUAL_PARTICIPANT_LIST_GET = "BILLINGS_ZEV_INDIVIDUAL_PARTICIPANT_LIST_GET",
  BILLINGS_PARTICIPANT_GET = "BILLINGS_PARTICIPANT_GET",
  BILLINGS_PARTICIPANT_SUSPEND = "BILLINGS_PARTICIPANT_SUSPEND",
  BILLINGS_PARTICIPANT_UNSUSPEND = "BILLINGS_PARTICIPANT_UNSUSPEND",
  BILLINGS_PARTICIPANT_APPROVE = "BILLINGS_PARTICIPANT_APPROVE",
  BILLINGS_PARTICIPANT_REOPEN = "BILLINGS_PARTICIPANT_REOPEN",
  BILLINGS_ALL_PARTICIPANT_UPDATE_PRICES = "BILLINGS_ALL_PARTICIPANT_UPDATE_PRICES",
  BILLINGS_PARTICIPANT_FINALISE_GET = "BILLINGS_PARTICIPANT_FINALISE_GET",
  BILLINGS_ALL_PARTICIPANT_PDF_GET = "BILLINGS_ALL_PARTICIPANT_PDF_GET",
  BILLINGS_ALL_PARTICIPANT_CSV_GET = "BILLINGS_ALL_PARTICIPANT_CSV_GET",
  BILLINGS_BILL_PDF_GET = "BILLINGS_BILL_PDF_GET",
  BILLINGS_BILL_PAID = "BILLINGS_BILL_PAID",
  BILLINGS_PARTICIPANT_GET_SERVICE_COMPONENT_FEATURES = "BILLINGS_PARTICIPANT_GET_SERVICE_COMPONENT_FEATURES",
  BILLINGS_PARTICIPANT_SAP_SEND = "BILLINGS_PARTICIPANT_SAP_SEND",
}

export const billingsParticipantEpic = [
  createEpic<ZevServiceComponentFeaturesResponse>(
    BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET_SERVICE_COMPONENT_FEATURES,
    (action) => getZevServiceComponentFeatures(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SAP_SEND, (action) =>
    sendSapParticipantBillings(action.billingId, action.billingParticipantType, DOMAIN_DEPENDENCIES),
  ),
  createEpic<BillingsAllParticipantList>(
    BillingsParticipantActionType.BILLINGS_ZEV_ALL_PARTICIPANT_LIST_GET,
    (action) => getZevAllParticipantBillings(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<BillingsIndividualParticipantList>(
    BillingsParticipantActionType.BILLINGS_ZEV_INDIVIDUAL_PARTICIPANT_LIST_GET,
    (action) => getZevIndividualParticipantBillings(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<BillingsParticipantDetail>(BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET, (action) =>
    getParticipantBillingDetail(action.billingId, action.billingParticipantType, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SUSPEND, (action) =>
    suspendParticipantBilling(action.billingId, action.billingParticipantType, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_PARTICIPANT_UNSUSPEND, (action) =>
    unsuspendParticipantBilling(action.billingId, action.billingParticipantType, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_PARTICIPANT_APPROVE, (action) =>
    approveParticipantBilling(action.billingId, action.billingParticipantType, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_PARTICIPANT_REOPEN, (action) =>
    reopenParticipantBilling(action.billingId, action.billingParticipantType, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_UPDATE_PRICES, (action) =>
    updateAllParticipantBillingPrices(action.billingId, action.pricesUpsert, DOMAIN_DEPENDENCIES),
  ),
  createEpic<BillingsParticipantFinalise>(BillingsParticipantActionType.BILLINGS_PARTICIPANT_FINALISE_GET, (action) =>
    getParticipantBillingFinalise(action.billingId, action.billingParticipantType, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_PDF_GET, (action) =>
    downloadAllParticipantBillPdf(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_CSV_GET, (action) =>
    downloadAllParticipantBillCsv(action.billingId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_BILL_PDF_GET, (action) =>
    downloadBillPdf(action.billId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(BillingsParticipantActionType.BILLINGS_BILL_PAID, (action) =>
    paidOrUnpaidBill(action.billId, action.paid, DOMAIN_DEPENDENCIES),
  ),
]
