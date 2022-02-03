import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ErrorAlert, SuccessAlert } from "../../../uikit/Shared.Alert"
import { firstViewState } from "../../Shared.Reducer"
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom"
import { AppRouteParams } from "../../App.Routes"
import { PaperBox } from "../../../uikit/page/PaperBox"
import { coerce } from "../../Shared.View"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { BillingStatusTypeView } from "./view/BillingStatusTypeView"
import { BillingParticipantType } from "../../../domain/billings/participant/BillingsParticipant.Model"
import { mapDispatchToProps } from "./BillingsParticipantFinalise.Connect"
import { BillingsParticipantFinaliseState } from "./BillingsParticipantFinalise.Reducer"
import { SpaceBetweenMiddleBox } from "../../../uikit/box/AlignmentBox"
import { PrimaryButtonLoading } from "../../../uikit/button/PrimaryButtonLoading"
import { ImpressionHeader } from "../../../uikit/typography/Header"
import { DataItemBox } from "../../../uikit/box/DataItemBox"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { PdfIcon } from "./view/PdfIcon"
import { BillingsConsumptionTable } from "./view/BillingsConsumptionTable"
import { BillingsTotalView } from "./view/BillingsTotalView"
import { AlignEndBox } from "../../../uikit/box/AlignmentBox"
import { DownloadIcon } from "../../../uikit/Shared.Icon"
import { ProgressIndicator } from "../../../uikit/progress/ProgressIndicator"
import { ServiceComponentFeature } from "../../../domain/service-components/ServiceComponents.Model"

interface BillingsParticipantFinaliseComponentProps
  extends BillingsParticipantFinaliseState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {
  billingParticipantType: BillingParticipantType
}

export const BillingsParticipantFinaliseComponent = withRouter((props: BillingsParticipantFinaliseComponentProps) => {
  const { t } = useTranslation("billings-participant")

  const {
    match,
    viewState,
    getParticipantBillingFinalise,
    billingParticipantType,
    pdfViewState,
    downloadAllParticipantsPdf,
    csvViewState,
    downloadAllParticipantsCsv,
    reopenViewState,
    reopenParticipantBilling,
    downloadBillPdf,
    billPdfViewStateMap,
    billPaid,
    billUnpaid,
    billPaidViewStateMap,
    componentFeaturesDataViewState,
    getZevServiceComponentFeatures,
    sapSendViewState,
    sapSendWithOutConfirm,
    sapSendWithConfirm,
  } = props

  const [isMinimalView, setIsMinimalView] = useState<boolean>(true)

  useEffect(() => {
    if (firstViewState(viewState)) {
      getParticipantBillingFinalise(match.params.billingId, billingParticipantType)
      getZevServiceComponentFeatures(match.params.zevId)
    }
  }, [viewState, match, billingParticipantType])

  useEffect(() => {
    if (componentFeaturesDataViewState && componentFeaturesDataViewState.domainResult) {
      const hasCollectionServiceComponent =
        componentFeaturesDataViewState.domainResult.features.indexOf(ServiceComponentFeature.COLLECTION) > -1
      setIsMinimalView(hasCollectionServiceComponent)
    }
  }, [componentFeaturesDataViewState, setIsMinimalView])

  const reopenRedirect = useMemo(() => {
    const billingType = billingParticipantType === BillingParticipantType.ALL ? "all" : "individual"
    return `/zevs/${match.params.zevId}/billings/${billingType}/${match.params.billingId}/edit`
  }, [match, billingParticipantType])

  if (viewState.isLoading) return <ProgressIndicator />
  if (viewState.domainError)
    return (
      <ErrorAlert
        retry={() => getParticipantBillingFinalise(match.params.billingId, billingParticipantType)}
        message={viewState.domainError.message}
      />
    )
  return (
    <>
      {pdfViewState.domainError && <ErrorAlert message={pdfViewState.domainError.message} />}
      {csvViewState.domainError && <ErrorAlert message={csvViewState.domainError.message} />}
      {reopenViewState.domainError && <ErrorAlert message={reopenViewState.domainError.message} />}
      {reopenViewState.domainResult && <Redirect to={reopenRedirect} />}
      {coerce(viewState.domainResult, (billingsParticipantFinalise) => (
        <PaperBox>
          <SpaceBetweenMiddleBox>
            <SmallPaddedBox>
              <BillingStatusTypeView billingStatusType={billingsParticipantFinalise.billingStatusType} />
            </SmallPaddedBox>
            <SmallPaddedBox>
              <PrimaryButtonLoading
                label={t("shared:form.action.edit")}
                isLoading={reopenViewState.isLoading}
                onClick={() => reopenParticipantBilling(match.params.billingId, billingParticipantType)}
              />
            </SmallPaddedBox>
          </SpaceBetweenMiddleBox>
          <ImpressionHeader>{t("detail.finalise.title")}</ImpressionHeader>
          <SmallPaddedBox>
            <SpaceBetweenMiddleBox>
              <DataItemBox title={t("detail.finalise.period")} value={billingsParticipantFinalise.billingDateRange} />
              <DataItemBox title={t("detail.finalise.invoiceDate")} value={billingsParticipantFinalise.invoiceDate} />
              <DataItemBox title={t("detail.finalise.total")} value={billingsParticipantFinalise.totalCosts} />
              <DataItemBox
                title={t("detail.finalise.status")}
                value={t(`state.${billingsParticipantFinalise.billingStatusType}`)}
              />
              <DividerBox />
            </SpaceBetweenMiddleBox>
          </SmallPaddedBox>
          <SmallPaddedBox>
            <SuccessAlert
              icon={<PdfIcon />}
              title={t("detail.finalise.invoiceReady.title")}
              message={t("detail.finalise.invoiceReady.body")}
            />
          </SmallPaddedBox>
          <SmallPaddedBox>
            <BillingsConsumptionTable
              billingsConsumptionPaid={{
                paid: (billId: string) => billPaid(billId),
                unpaid: (billId: string) => billUnpaid(billId),
                billPaidViewStateMap: billPaidViewStateMap,
              }}
              allConsumption={billingsParticipantFinalise.allConsumption}
              downloadBillPdf={(billId) => downloadBillPdf(billId)}
              billPdfViewStateMap={billPdfViewStateMap}
              noAction={isMinimalView}
            />
          </SmallPaddedBox>
          <DividerBox />
          <BillingsTotalView
            totalCosts={billingsParticipantFinalise.totalCosts}
            totalConsumption={billingsParticipantFinalise.totalConsumption}
          />
          <DividerBox />
          <AlignEndBox>
            {!isMinimalView && (
              <>
                <PrimaryButtonLoading
                  startIcon={<PdfIcon color="#FFFFFF" />}
                  isLoading={pdfViewState.isLoading}
                  label={t("detail.finalise.downloadAll")}
                  onClick={() => downloadAllParticipantsPdf(match.params.billingId)}
                />
                <DividerBox />
              </>
            )}
            <PrimaryButtonLoading
              startIcon={<DownloadIcon />}
              isLoading={csvViewState.isLoading}
              label={t("detail.finalise.downloadCsv")}
              onClick={() => downloadAllParticipantsCsv(match.params.billingId)}
            />
            <DividerBox />
            <PrimaryButtonLoading
              isLoading={sapSendViewState.isLoading}
              label={t("detail.finalise.sendToSap")}
              onClick={() => {
                if (sapSendViewState.domainResult)
                  sapSendWithConfirm(
                    match.params.billingId,
                    billingParticipantType,
                    t("dialog.sap.body"),
                    t("dialog.sap.cta"),
                  )
                else sapSendWithOutConfirm(match.params.billingId, billingParticipantType)
              }}
            />
          </AlignEndBox>
        </PaperBox>
      ))}
    </>
  )
})
