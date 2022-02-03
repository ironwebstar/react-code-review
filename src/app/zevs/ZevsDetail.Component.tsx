import { useEffect, useMemo, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { useTranslation } from "react-i18next"
import { ZevsDetailState } from "./ZevsDetail.Reducer"
import { coerce } from "../Shared.View"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { SpaceBetweenMiddleBox } from "../../uikit/box/AlignmentBox"
import { ImpressionHeader } from "../../uikit/typography/Header"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import {
  ActivateIcon,
  DeactivateIcon,
  AddressIcon,
  ContactIcon,
  CorrespondenceIcon,
  MainContactIcon,
  MeasurementIcon,
  MobilePhoneIcon,
  PaymentInformationIcon,
  RemoveIcon,
  TelephoneIcon,
  BillingIcon,
} from "../../uikit/Shared.Icon"
import { FormRowCell, FormRowColumn, FormSectionTitle, FormSubtitle } from "../../uikit/form/FormView"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { AppRouteParams } from "../App.Routes"
import { StatusView } from "../../uikit/label/StatusView"
import { StatusType } from "../../domain/Domain.Model"
import { DividerBox } from "../../uikit/box/DividerBox"
import { AlignBottomBox } from "../../uikit/box/AlignmentBox"
import { ZevActivateForm } from "./form/ZevActivateForm"
import { ZevDeactivateForm } from "./form/ZevDeactivateForm"
import { PricesDetailView } from "../prices/view/PricesDetailView"
import ProfilesZevManagerListConnect from "../profiles/ProfilesZevManagerList.Connect"
import BuildingsZevListConnect from "../buildings/BuildingsZevList.Connect"
import ContractsZevListConnect from "../contracts/ContractsZevList.Connect"
import ParticipantZevListConnect from "../participant/ParticipantZevList.Connect"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import MeterReadingsIntraDayConnect from "../meter-readings/MeterReadingsIntraDay.Connect"
import MeterReadingsZevConnect from "../meter-readings/MeterReadingsZev.Connect"
import { Box, Tabs, Tab } from "@mui/material"
import { mapDispatchToProps } from "./ZevsDetail.Connect"
import BillingsAllParticipantZevListConnect from "../billings/participant/BillingsAllParticipantZevList.Connect"
import BillingsIndividualParticipantZevListConnect from "../billings/participant/BillingsIndividualParticipantZevList.Connect"
import ZevDetailInitialConnect from "./ZevsDetailInitialBillings.Connect"
import ZevsDetailRecurringBillingsConnect from "./ZevsDetailRecurringBillings.Connect"

interface ZevsDetailComponentProps
  extends ZevsDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

enum ZevParticipantBillingTab {
  ALL_PARTICIPANTS = 0,
  INDIVIDUAL_PARTICIPANTS = 1,
}

enum ZevParticipantServiceInvoiceTab {
  INITIAL = 0,
  RECURRING = 1,
}

export const ZevsDetailComponent = (props: ZevsDetailComponentProps) => {
  const { t } = useTranslation("zevs")
  const {
    getZev,
    getZevViewState,
    deleteZev,
    deleteZevViewState,
    activateZev,
    activateZevViewState,
    deactivateZev,
    deactivateZevViewState,
    createInvoice,
    createInvoiceViewState,
    match,
    navigateToUpdateZev,
    showZevUpdatedSuccessAlert,
  } = props
  const zevId = useMemo(() => match.params.zevId, [match])

  useEffect(() => {
    if (
      firstViewState(getZevViewState) ||
      (getZevViewState.domainResult && getZevViewState.domainResult.id !== zevId)
    ) {
      getZev(zevId)
    }
  }, [getZevViewState, zevId])

  const [showActivateDialog, setShowActivateDialog] = useState(false)
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)
  const [selectedParticipantBillingTab, setSelectedParticipantBillingTab] = useState(
    ZevParticipantBillingTab.ALL_PARTICIPANTS,
  )
  const [selectedServiceInvoiceTab, setSelectedServiceInvoiceTab] = useState(ZevParticipantServiceInvoiceTab.INITIAL)

  if (getZevViewState.isLoading) return <ProgressIndicator />
  if (getZevViewState.domainError) return <ErrorAlert message={getZevViewState.domainError.message} />
  if (deleteZevViewState.domainResult) return <Redirect to="/zevs" />
  if (createInvoiceViewState.domainResult)
    return <Redirect to={`/billings/initial/details/${createInvoiceViewState.domainResult}`} />
  return (
    <>
      {showZevUpdatedSuccessAlert && <SuccessAlert message={t("form.alert.success")} />}
      {coerce(getZevViewState.domainResult, (zevDetail) => (
        <>
          <PaperBox>
            <SpaceBetweenMiddleBox>
              <SmallPaddedBox>
                <StatusView statusType={zevDetail.statusType} />
              </SmallPaddedBox>
              <SmallPaddedBox>
                <PrimaryEditButton onClick={() => navigateToUpdateZev(zevId)} />
              </SmallPaddedBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <ImpressionHeader>{zevDetail.name}</ImpressionHeader>
              <SpaceBetweenMiddleBox>
                <FlexOneBox>
                  <DataItemBox title={t("form.field.serviceStartDate")} value={zevDetail.serviceStartDate} />
                </FlexOneBox>
                <FlexOneBox>
                  <DataItemBox title={t("form.field.serviceEndDate")} value={zevDetail.serviceEndDate} />
                </FlexOneBox>
              </SpaceBetweenMiddleBox>
              <SpaceBetweenMiddleBox>
                <FlexOneBox>
                  <DataItemBox title={t("form.field.nextBillingDate")} value={zevDetail.nextBillingDate} />
                </FlexOneBox>
              </SpaceBetweenMiddleBox>
              <SpaceBetweenMiddleBox>
                <FlexOneBox>
                  <DataItemBox title={t("form.field.billingFrequency")} value={zevDetail.billingFrequency} />
                </FlexOneBox>
                <FlexOneBox>
                  <DataItemBox title={t("form.field.nextBillingFrequency")} value={zevDetail.nextBillingFrequency} />
                </FlexOneBox>
              </SpaceBetweenMiddleBox>
              <SpaceBetweenMiddleBox>
                <FlexOneBox>
                  <DataItemBox title={t("form.field.zevStartDate")} value={zevDetail.zevStartDate} />
                </FlexOneBox>
              </SpaceBetweenMiddleBox>
              <SpaceBetweenMiddleBox>
                <FlexOneBox>
                  <DataItemBox
                    title={t("form.field.externalReferenceNumber")}
                    value={zevDetail.externalReferenceNumber}
                  />
                </FlexOneBox>
              </SpaceBetweenMiddleBox>
            </SpaceBetweenMiddleBox>
            <FormSectionTitle label={t("form.subtitle.measurement")} icon={<MeasurementIcon fontSize="large" />} />
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.incomingMeteringCode")} value={zevDetail.incomingMeteringCode} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.outgoingMeteringCode")} value={zevDetail.outgoingMeteringCode} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <FormSectionTitle label={t("form.subtitle.contact")} icon={<ContactIcon fontSize="large" />} />
            <FormRowColumn>
              <FormRowCell>
                <FormSubtitle label={t("form.subtitle.telephone")} icon={<TelephoneIcon />} />
              </FormRowCell>
              <FormRowCell>
                <FormSubtitle label={t("form.subtitle.mobile")} icon={<MobilePhoneIcon />} />
              </FormRowCell>
            </FormRowColumn>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.contactTelephoneNumber")} value={zevDetail.contactTelephoneNumber} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.contactMobileNumber")} value={zevDetail.contactMobileNumber} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <FormSubtitle label={t("form.subtitle.correspondance")} icon={<CorrespondenceIcon />} />
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.contactEmail")} value={zevDetail.contactEmail} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <FormSectionTitle label={t("form.subtitle.address")} icon={<AddressIcon fontSize="large" />} />
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressLineOne")} value={zevDetail.addressLineOne} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressLineTwo")} value={zevDetail.addressLineTwo} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.addressStreet")}
                  value={`${zevDetail.addressStreet} ${zevDetail.addressHouseNumber}`}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.addressCity")}
                  value={`${zevDetail.addressPostalCode} ${zevDetail.addressCity}`}
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.municipality")} value={zevDetail.municipality} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <FormSectionTitle label={t("form.subtitle.mainContact")} icon={<MainContactIcon fontSize="large" />} />
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.mainContactName")} value={zevDetail.mainContactName} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.mainContactTelephoneNumber")}
                  value={zevDetail.mainContactTelephoneNumber}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.mainContactMobileNumber")}
                  value={zevDetail.mainContactMobileNumber}
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.mainContactEmail")} value={zevDetail.mainContactEmail} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <FormSectionTitle
              label={t("form.subtitle.paymentInformation")}
              icon={<PaymentInformationIcon fontSize="large" />}
            />
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.paymentInformationPayee")}
                  value={zevDetail.paymentInformationPayee}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.paymentInformationAccountNumber")}
                  value={zevDetail.paymentInformationAccountNumber}
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.paymentInformationIban")} value={zevDetail.paymentInformationIban} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.paymentInformationVatNumber")}
                  value={zevDetail.paymentInformationVatNumber}
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.paymentInformationAddressStreet")}
                  value={
                    `${zevDetail.paymentInformationAddressStreet} ` +
                    `${zevDetail.paymentInformationAddressHouseNumber}`
                  }
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.paymentInformationAddressCity")}
                  value={
                    `${zevDetail.paymentInformationAddressPostalCode} ` + `${zevDetail.paymentInformationAddressCity}`
                  }
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <DividerBox />
            {deleteZevViewState.domainError && <ErrorAlert message={deleteZevViewState.domainError.message} />}
            {activateZevViewState.domainResult && <SuccessAlert message={t("details.action.activate.success")} />}
            {activateZevViewState.domainError && <ErrorAlert message={activateZevViewState.domainError.message} />}
            {deactivateZevViewState.domainResult && <SuccessAlert message={t("details.action.deactivate.success")} />}
            {deactivateZevViewState.domainError && <ErrorAlert message={deactivateZevViewState.domainError.message} />}
            {createInvoiceViewState.domainError && <ErrorAlert message={createInvoiceViewState.domainError.message} />}
            <SmallPaddedBox>
              <AlignBottomBox>
                <PrimaryButtonLoading
                  startIcon={<RemoveIcon fontSize="large" />}
                  label={t("details.action.delete")}
                  isLoading={deleteZevViewState.isLoading}
                  disabled={zevDetail.statusType !== StatusType.DRAFT}
                  onClick={() =>
                    deleteZev(zevId, t("details.action.delete.confirm"), t("details.action.delete.confirm.cta"))
                  }
                />
                <DividerBox />
                <PrimaryButtonLoading
                  startIcon={<ActivateIcon fontSize="large" />}
                  label={t("details.action.activate")}
                  isLoading={activateZevViewState.isLoading}
                  disabled={zevDetail.statusType !== StatusType.DRAFT && zevDetail.statusType !== StatusType.MODIFIED}
                  onClick={() => {
                    if (zevDetail.statusType === StatusType.DRAFT) {
                      activateZev(zevId)
                    } else {
                      setShowActivateDialog(true)
                    }
                  }}
                />
                <DividerBox />
                <PrimaryButtonLoading
                  startIcon={<DeactivateIcon fontSize="large" />}
                  label={t("details.action.deactivate")}
                  isLoading={deactivateZevViewState.isLoading}
                  disabled={zevDetail.statusType !== StatusType.ACTIVE}
                  onClick={() => setShowDeactivateDialog(true)}
                />
                <DividerBox />
                <PrimaryButtonLoading
                  startIcon={<BillingIcon fontSize="large" />}
                  label={t("details.action.create-initial-billing")}
                  isLoading={createInvoiceViewState.isLoading}
                  disabled={!zevDetail.readyForInitialInvoice}
                  onClick={() => createInvoice(zevId)}
                />
              </AlignBottomBox>
            </SmallPaddedBox>
            {showActivateDialog && (
              <ZevActivateForm
                open={showActivateDialog}
                onClose={() => setShowActivateDialog(false)}
                confirmClick={(billingFromDate) => {
                  setShowActivateDialog(false)
                  activateZev(zevId, billingFromDate)
                }}
              />
            )}
            {showDeactivateDialog && (
              <ZevDeactivateForm
                open={showDeactivateDialog}
                onClose={() => setShowDeactivateDialog(false)}
                zevStartDate={zevDetail.zevStartDateValue}
                confirmClick={(billingUntilDate) => {
                  setShowDeactivateDialog(false)
                  deactivateZev(zevId, billingUntilDate)
                }}
              />
            )}
          </PaperBox>
          <DividerBox />
          <PaperBox>
            <FormSectionTitle label={t("prices.title")} />
            <PricesDetailView pricePackages={zevDetail.pricePackages} />
          </PaperBox>
          <DividerBox />
          <ProfilesZevManagerListConnect zevId={zevDetail.id} />
          <DividerBox />
          <BuildingsZevListConnect zevId={zevDetail.id} />
          <DividerBox />
          <ContractsZevListConnect zevId={zevDetail.id} readyForInitialContract={zevDetail.readyForInitialContract} />
          <DividerBox />
          <ParticipantZevListConnect zevId={zevDetail.id} />
          <DividerBox />
          <PaperBox>
            <FormSectionTitle label={t("detail.participant.billing.title")} />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={selectedParticipantBillingTab}
                  onChange={(_, newValue) => setSelectedParticipantBillingTab(newValue)}
                >
                  <Tab color="secondary" label={t("detail.participant.billing.tab.all")} />
                  <Tab color="secondary" label={t("detail.participant.billing.tab.individual")} />
                </Tabs>
                {selectedParticipantBillingTab === ZevParticipantBillingTab.ALL_PARTICIPANTS && (
                  <BillingsAllParticipantZevListConnect zevId={zevId} />
                )}
                {selectedParticipantBillingTab === ZevParticipantBillingTab.INDIVIDUAL_PARTICIPANTS && (
                  <BillingsIndividualParticipantZevListConnect zevId={zevId} />
                )}
              </Box>
            </Box>
          </PaperBox>
          <PaperBox>
            <FormSectionTitle label={t("form.subtitle.serviceInvoices")} />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={selectedServiceInvoiceTab}
                  onChange={(_, newValue) => setSelectedServiceInvoiceTab(newValue)}
                >
                  <Tab color="secondary" label={t("detail.participant.billing.tab.initial")} />
                  <Tab color="secondary" label={t("detail.participant.billing.tab.recurring")} />
                </Tabs>
                {selectedServiceInvoiceTab === ZevParticipantServiceInvoiceTab.INITIAL && (
                  <ZevDetailInitialConnect zevId={zevId} />
                )}
                {selectedServiceInvoiceTab === ZevParticipantServiceInvoiceTab.RECURRING && (
                  <ZevsDetailRecurringBillingsConnect zevId={zevId} />
                )}
              </Box>
            </Box>
          </PaperBox>
          <DividerBox />
          <MeterReadingsZevConnect zevId={zevDetail.id} />
          <DividerBox />
          <MeterReadingsIntraDayConnect zevId={zevDetail.id} />
        </>
      ))}
    </>
  )
}
