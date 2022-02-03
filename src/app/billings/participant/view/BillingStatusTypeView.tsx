import { TFunction, useTranslation } from "react-i18next"
import { BillingStatusType } from "../../../../domain/billings/participant/BillingsParticipant.Model"
import { ChipColor, StatusChipView } from "../../../../uikit/label/StatusChipView"

interface BillingStatusTypeViewProps {
  billingStatusType: BillingStatusType
}

export const BillingStatusTypeView = (props: BillingStatusTypeViewProps) => {
  const { t } = useTranslation()
  const { billingStatusType } = props
  return (
    <StatusChipView
      chipColor={statusChipColor(billingStatusType)}
      label={formatStatusTypeLabel(billingStatusType, t)}
    />
  )
}

const statusChipColor = (statusType: BillingStatusType) => {
  switch (statusType) {
    case BillingStatusType.WAITING_FOR_DATA:
      return ChipColor.GREY
    case BillingStatusType.DATA_AVAILABLE:
      return ChipColor.YELLOW
    case BillingStatusType.SUSPENDED:
      return ChipColor.GREY
    case BillingStatusType.IN_PROGRESS:
      return ChipColor.TEAL
    case BillingStatusType.IN_PROGRESS_REOPENED:
      return ChipColor.TEAL
    case BillingStatusType.DONE:
      return ChipColor.GREEN
    case BillingStatusType.PAID:
      return ChipColor.GREEN
  }
}

const formatStatusTypeLabel = (statusType: BillingStatusType, t: TFunction) => {
  switch (statusType) {
    case BillingStatusType.WAITING_FOR_DATA:
      return t("shared:billing.status.WAITING_FOR_DATA")
    case BillingStatusType.DATA_AVAILABLE:
      return t("shared:billing.status.DATA_AVAILABLE")
    case BillingStatusType.SUSPENDED:
      return t("shared:billing.status.SUSPENDED")
    case BillingStatusType.IN_PROGRESS:
      return t("shared:billing.status.IN_PROGRESS")
    case BillingStatusType.IN_PROGRESS_REOPENED:
      return t("shared:billing.status.IN_PROGRESS_REOPENED")
    case BillingStatusType.DONE:
      return t("shared:billing.status.DONE")
    case BillingStatusType.PAID:
      return t("shared:billing.status.PAID")
  }
}
