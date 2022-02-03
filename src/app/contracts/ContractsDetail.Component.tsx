import { Redirect, RouteComponentProps } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { ContractsDetailState } from "./ContractsDetail.Reducer"
import { coerce } from "../Shared.View"
import { SpaceBetweenBox, SpaceBetweenMiddleBox, AlignBottomBox } from "../../uikit/box/AlignmentBox"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { EditIcon, ProductIcon, RemoveIcon, ZevsIcon, ActivateIcon } from "../../uikit/Shared.Icon"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { FormSubtitle } from "../../uikit/form/FormView"
import { AppRouteParams } from "../App.Routes"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { StatusView } from "../../uikit/label/StatusView"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ContractsReplaceForm } from "./form/ContractsReplaceForm"
import { StatusType } from "../../domain/Domain.Model"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import { mapDispatchToProps } from "./ContractsDetail.Connect"
import { OpenButton } from "../../uikit/button/OpenButton"

interface ContractsDetailComponentProps
  extends ContractsDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ContractsDetailComponent = (props: ContractsDetailComponentProps) => {
  const { t } = useTranslation("contracts")
  const {
    getViewState,
    getContractById,
    replaceContract,
    replaceContractViewState,
    deleteContract,
    deleteContractViewState,
    approveContract,
    approveContractViewState,
    match,
    navigateToZev,
    showReplaceAlert,
    showUpdateAlert,
    navigateToUpdateContract,
    navigateToProduct,
  } = props

  useEffect(() => {
    if (firstViewState(getViewState)) {
      if (replaceContractViewState.domainResult) {
        getContractById(replaceContractViewState.domainResult)
      } else {
        getContractById(match.params.contractId)
      }
    }
  }, [getViewState, replaceContractViewState])

  const [showReplaceContractDialog, setShowReplaceContractDialog] = useState(false)

  if (getViewState.isLoading) return <ProgressIndicator />
  return (
    <>
      {getViewState.domainError && <ErrorAlert message={getViewState.domainError.message} />}
      {deleteContractViewState.domainResult && <Redirect to="/contracts" />}
      {deleteContractViewState.domainError && <ErrorAlert message={deleteContractViewState.domainError.message} />}
      {approveContractViewState.domainError && <ErrorAlert message={approveContractViewState.domainError.message} />}
      {replaceContractViewState.domainResult && <Redirect to={`/contracts/${replaceContractViewState.domainResult}`} />}
      {replaceContractViewState.domainError && <ErrorAlert message={replaceContractViewState.domainError.message} />}
      {showReplaceAlert && <SuccessAlert message={t("detail.replace.success")} />}
      {showUpdateAlert && <SuccessAlert message={t("form.alert.success")} />}
      {coerce(getViewState.domainResult, (contractDetail) => (
        <PaperBox>
          <SpaceBetweenMiddleBox>
            <SmallPaddedBox>
              <StatusView statusType={contractDetail.contractStatus} />
            </SmallPaddedBox>
            {contractDetail.contractStatus === StatusType.DRAFT && (
              <SmallPaddedBox>
                <PrimaryEditButton onClick={() => navigateToUpdateContract(contractDetail.id)} />
              </SmallPaddedBox>
            )}
          </SpaceBetweenMiddleBox>
          <SpaceBetweenBox>
            <FlexOneBox>
              <DataItemBox title={t("field.label.start-date")} value={contractDetail.startDate} />
            </FlexOneBox>
            <FlexOneBox>
              <DataItemBox title={t("field.label.end-date")} value={contractDetail.endDate} />
            </FlexOneBox>
          </SpaceBetweenBox>
          <SpaceBetweenMiddleBox>
            <SpaceBetweenBox>
              <FormSubtitle label={t("field.label.product")} icon={<ProductIcon fontSize="large" />} />
              <DataItemBox
                title={t("field.label.product")}
                value={
                  <OpenButton
                    label={contractDetail.productName}
                    open={() => navigateToProduct(contractDetail.productId)}
                  />
                }
              />
            </SpaceBetweenBox>
            <SpaceBetweenBox>
              <FormSubtitle label={t("field.label.zev")} icon={<ZevsIcon fontSize="large" />} />
              <AlignBottomBox>
                <DataItemBox
                  title={t("field.label.zev")}
                  value={<OpenButton label={contractDetail.zevName} open={() => navigateToZev(contractDetail.zevId)} />}
                />
              </AlignBottomBox>
            </SpaceBetweenBox>
            <SmallPaddedBox>
              <AlignBottomBox>
                {contractDetail.contractStatus === StatusType.APPROVED && (
                  <>
                    <PrimaryButtonLoading
                      startIcon={<EditIcon fontSize="large" />}
                      label={t("detail.replace-contract")}
                      isLoading={replaceContractViewState.isLoading}
                      onClick={() => setShowReplaceContractDialog(true)}
                    />
                    <DividerBox />
                  </>
                )}
                <PrimaryButtonLoading
                  startIcon={<ActivateIcon fontSize="large" />}
                  label={t("detail.approve-contract")}
                  isLoading={approveContractViewState.isLoading}
                  disabled={contractDetail.contractStatus !== StatusType.DRAFT}
                  onClick={() => approveContract(match.params.contractId)}
                />
                <DividerBox />
                <PrimaryButtonLoading
                  startIcon={<RemoveIcon fontSize="large" />}
                  label={t("update.delete-contract")}
                  isLoading={deleteContractViewState.isLoading}
                  disabled={contractDetail.contractStatus !== StatusType.DRAFT}
                  onClick={() => deleteContract(match.params.contractId)}
                />
              </AlignBottomBox>
            </SmallPaddedBox>
            {showReplaceContractDialog && (
              <ContractsReplaceForm
                currentStartDate={contractDetail.startDateValue}
                currentEndDate={contractDetail.endDateValue}
                currentProductId={contractDetail.productId}
                availableProducts={contractDetail.availableProducts}
                onOpen={showReplaceContractDialog}
                onClose={() => setShowReplaceContractDialog(false)}
                onConfirm={(currentContractEndDate, selectedProductId) => {
                  setShowReplaceContractDialog(false)
                  replaceContract(match.params.contractId, selectedProductId, currentContractEndDate)
                }}
              />
            )}
          </SpaceBetweenMiddleBox>
        </PaperBox>
      ))}
    </>
  )
}
