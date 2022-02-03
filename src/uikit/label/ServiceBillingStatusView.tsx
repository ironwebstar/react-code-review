import { TFunction, useTranslation } from "react-i18next"
import { ServiceBillingState } from "../../data/generated-sources/openapi"
import { StatusChipView, ChipColor } from "./StatusChipView"

interface StatusViewProps {
  statusType: ServiceBillingState
}

export const ServiceBillingStatusView = (props: StatusViewProps) => {
  const { t } = useTranslation()
  const { statusType: status } = props
  return <StatusChipView chipColor={statusChipColor(status)} label={formatStatusTypeLabel(status, t)} />
}

const statusChipColor = (statusType: ServiceBillingState) => {
  switch (statusType) {
    case ServiceBillingState.DRAFT:
      return ChipColor.ORANGE
    case ServiceBillingState.APPROVED:
      return ChipColor.GREEN
    case ServiceBillingState.CANCELLED:
      return ChipColor.RED
    default:
      return ChipColor.GREY
  }
}

const formatStatusTypeLabel = (statusType: ServiceBillingState, t: TFunction) => {
  switch (statusType) {
    case ServiceBillingState.DRAFT:
      return t("shared:status.draft")
    case ServiceBillingState.APPROVED:
      return t("shared:status.approved")
    case ServiceBillingState.CANCELLED:
      return t("shared:status.cancelled")
    default:
      return ""
  }
}
