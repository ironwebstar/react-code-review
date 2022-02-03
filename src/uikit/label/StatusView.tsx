import { useTranslation } from "react-i18next"
import { StatusType } from "../../domain/Domain.Model"
import { StatusChipView, ChipColor } from "./StatusChipView"

interface StatusViewProps {
  id?: string
  statusType: StatusType
}

export const StatusView = (props: StatusViewProps) => {
  const { t } = useTranslation()
  const { id, statusType } = props
  return <StatusChipView id={id} chipColor={statusChipColor(statusType)} label={t(`shared:status.${statusType}`)} />
}

const statusChipColor = (statusType: StatusType) => {
  switch (statusType) {
    case StatusType.DRAFT:
      return ChipColor.ORANGE
    case StatusType.DONE:
    case StatusType.CREATED:
    case StatusType.ACTIVE:
    case StatusType.APPROVED:
      return ChipColor.GREEN
    case StatusType.INACTIVE:
    case StatusType.TERMINATED:
      return ChipColor.GREY
    case StatusType.MODIFIED:
      return ChipColor.TEAL
    case StatusType.CANCELLED:
      return ChipColor.GREY
  }
}
