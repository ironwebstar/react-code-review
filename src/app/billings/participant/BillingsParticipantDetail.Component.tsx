import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ErrorAlert, SuccessAlert } from "../../../uikit/Shared.Alert"
import { firstViewState } from "../../Shared.Reducer"
import { mapDispatchToProps } from "./BillingsParticipantDetail.Connect"
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom"
import { AppRouteParams } from "../../App.Routes"
import { PaperBox } from "../../../uikit/page/PaperBox"
import { coerce } from "../../Shared.View"
import { BillingsParticipantDetailState } from "./BillingsParticipantDetail.Reducer"
import { SmallPaddedBox, TinyPaddedBox } from "../../../uikit/box/PaddedBox"
import { Heading2, Heading4 } from "../../../uikit/typography/Typography"
import { Box } from "@mui/material"
import { SpaceBetweenMiddleBox } from "../../../uikit/box/AlignmentBox"
import { BillingStatusTypeView } from "./view/BillingStatusTypeView"
import { PrimaryButtonLoading } from "../../../uikit/button/PrimaryButtonLoading"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { CancelIcon, TickIcon } from "../../../uikit/Shared.Icon"
import {
  BillingParticipantType,
  BillingStatusType,
} from "../../../domain/billings/participant/BillingsParticipant.Model"
import { ParticipantOverviewChartView } from "./view/ParticipantOverviewChartView"
import { BillingsParticipantTable } from "./view/BillingsParticipantTable"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { BillingsConsumptionTable } from "./view/BillingsConsumptionTable"
import { AlignEndBox } from "../../../uikit/box/AlignmentBox"
import { PrimaryEditButton } from "../../../uikit/button/PrimaryEditButton"
import { AlignBottomBox } from "../../../uikit/box/AlignmentBox"
import { PricesDetailView } from "../../prices/view/PricesDetailView"
import { PricesForm } from "../../prices/form/PricesForm"
import { Formik } from "formik"
import { BillingsTotalView } from "./view/BillingsTotalView"
import { ProgressIndicator } from "../../../uikit/progress/ProgressIndicator"
import { formatPricePackages } from "../../../domain/prices/Prices.Formatter"

interface BillingsParticipantDetailComponentProps
  extends BillingsParticipantDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {
  billingParticipantType: BillingParticipantType
}

export const BillingsParticipantDetailComponent = withRouter((props: BillingsParticipantDetailComponentProps) => {
  const { t } = useTranslation("billings-participant")

  const [pricesEditMode, setPricesEditMode] = useState(false)

  const {
    match,
    viewState,
    getParticipantBilling,
    updatePricesViewState,
    updateParticipantPrices,
    suspendViewState,
    suspendParticipantBilling,
    unsuspendViewState,
    unsuspendParticipantBilling,
    approveViewState,
    approveParticipantBilling,
    navigateToConsumptionPoint,
    navigateToUpdateZev,
    billingParticipantType,
    billPdfViewStateMap,
    downloadBillPdf,
  } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getParticipantBilling(match.params.billingId, billingParticipantType)
    }
    if (updatePricesViewState.domainResult) {
      setPricesEditMode(false)
    }
  }, [viewState, match, updatePricesViewState, setPricesEditMode, billingParticipantType])

  const finaliseRedirect = useMemo(() => {
    const billingType = billingParticipantType === BillingParticipantType.ALL ? "all" : "individual"
    return `/zevs/${match.params.zevId}/billings/${billingType}/${match.params.billingId}/finalize`
  }, [match, billingParticipantType])

  if (viewState.isLoading) return <ProgressIndicator />
  if (viewState.domainError)
    return (
      <ErrorAlert
        retry={() => getParticipantBilling(match.params.billingId, billingParticipantType)}
        message={viewState.domainError.message}
      />
    )
  return (
    <>
      {suspendViewState.domainError && <ErrorAlert message={suspendViewState.domainError.message} />}
      {suspendViewState.domainResult && <SuccessAlert message={t("detail.all.alert.lock.success")} />}
      {unsuspendViewState.domainError && <ErrorAlert message={unsuspendViewState.domainError.message} />}
      {unsuspendViewState.domainResult && <SuccessAlert message={t("detail.all.alert.unlock.success")} />}
      {approveViewState.domainError && <ErrorAlert message={approveViewState.domainError.message} />}
      {approveViewState.domainResult && <Redirect to={finaliseRedirect} />}
      {coerce(viewState.domainResult, (billingsParticipantDetail) => (
        <PaperBox>
          {billingsParticipantDetail.billingFinalised && <Redirect to={finaliseRedirect} />}
          <SpaceBetweenMiddleBox>
            <SmallPaddedBox>
              <BillingStatusTypeView billingStatusType={billingsParticipantDetail.billingStatusType} />
            </SmallPaddedBox>
            <SmallPaddedBox>
              {(billingsParticipantDetail.billingStatusType === BillingStatusType.IN_PROGRESS ||
                billingsParticipantDetail.billingStatusType === BillingStatusType.IN_PROGRESS_REOPENED) && (
                <PrimaryButtonLoading
                  startIcon={<CancelIcon />}
                  isLoading={suspendViewState.isLoading}
                  label={t("detail.all.cta.lock")}
                  onClick={() => suspendParticipantBilling(match.params.billingId, billingParticipantType)}
                />
              )}
              {billingsParticipantDetail.billingStatusType === BillingStatusType.SUSPENDED && (
                <PrimaryButtonLoading
                  startIcon={<TickIcon />}
                  isLoading={unsuspendViewState.isLoading}
                  label={t("detail.all.cta.unlock")}
                  onClick={() => unsuspendParticipantBilling(match.params.billingId, billingParticipantType)}
                />
              )}
            </SmallPaddedBox>
          </SpaceBetweenMiddleBox>
          <SmallPaddedBox>
            <Heading2>{t("detail.all.title")}</Heading2>
            <Box my={1}>
              <Heading4>{t("detail.all.consumption-overview")}</Heading4>
            </Box>
          </SmallPaddedBox>
          <SmallPaddedBox>
            <ParticipantOverviewChartView billingParticipantDetail={billingsParticipantDetail} />
          </SmallPaddedBox>
          <SmallPaddedBox>
            <Heading4>{t("detail.all.participants.title")} </Heading4>
          </SmallPaddedBox>
          <BillingsParticipantTable
            allParticipants={billingsParticipantDetail.allParticipants}
            navigateToConsumptionPoint={navigateToConsumptionPoint}
          />
          <DividerBox />
          {billingsParticipantDetail.containsErrorMessages && (
            <ErrorAlert message={t("detail.all.participants.containsErrorMessages")} />
          )}
          {!billingsParticipantDetail.containsErrorMessages && (
            <>
              <AlignBottomBox>
                <SmallPaddedBox>
                  <Heading4>{t("detail.all.prices.title")}</Heading4>
                </SmallPaddedBox>
                <DividerBox />
                <SmallPaddedBox>
                  {!pricesEditMode && billingParticipantType === BillingParticipantType.ALL && (
                    <PrimaryEditButton onClick={() => setPricesEditMode(!pricesEditMode)} />
                  )}
                  {billingParticipantType === BillingParticipantType.INDIVIDUAL && (
                    <PrimaryEditButton onClick={() => navigateToUpdateZev(match.params.zevId)} />
                  )}
                </SmallPaddedBox>
              </AlignBottomBox>
              {updatePricesViewState.domainError && <ErrorAlert message={updatePricesViewState.domainError.message} />}
              {pricesEditMode ? (
                <Formik
                  initialValues={{
                    upsertPrices: billingsParticipantDetail.upsertPrices,
                  }}
                  onSubmit={(values) => updateParticipantPrices(match.params.billingId, values.upsertPrices)}
                >
                  {({ values, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <PricesForm
                        pricePackages={values.upsertPrices}
                        pricePackagesChanged={(pricePackages) => setFieldValue("upsertPrices", pricePackages)}
                      />
                      <AlignEndBox>
                        <TinyPaddedBox>
                          <PrimaryButton
                            label={t("shared:form.action.cancel")}
                            onClick={() => setPricesEditMode(false)}
                          />
                        </TinyPaddedBox>
                        <TinyPaddedBox>
                          <PrimaryButtonLoading
                            type="submit"
                            label={t("shared:form.action.save")}
                            isLoading={updatePricesViewState.isLoading}
                          />
                        </TinyPaddedBox>
                      </AlignEndBox>
                    </form>
                  )}
                </Formik>
              ) : (
                <PricesDetailView pricePackages={formatPricePackages(billingsParticipantDetail.prices)} />
              )}
              <DividerBox />
              <SmallPaddedBox>
                <Heading4>{t("detail.all.consumption.title")}</Heading4>
              </SmallPaddedBox>
              <BillingsConsumptionTable
                allConsumption={billingsParticipantDetail.allConsumption}
                billPdfViewStateMap={billPdfViewStateMap}
                downloadBillPdf={(billId) => downloadBillPdf(billId)}
                noAction={true}
              />
            </>
          )}
          <DividerBox />
          <BillingsTotalView
            totalCosts={billingsParticipantDetail.totalCosts}
            totalConsumption={billingsParticipantDetail.totalConsumption}
          />
          <DividerBox />
          <SmallPaddedBox>
            <AlignEndBox>
              <PrimaryButtonLoading
                disabled={billingsParticipantDetail.containsErrorMessages}
                onClick={() => approveParticipantBilling(match.params.billingId, billingParticipantType)}
                isLoading={approveViewState.isLoading}
                label={t("detail.all.action.cta")}
              />
            </AlignEndBox>
          </SmallPaddedBox>
        </PaperBox>
      ))}
    </>
  )
})
