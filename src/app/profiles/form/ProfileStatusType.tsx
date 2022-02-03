import { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { ProfileStatusType } from "../../../domain/profiles/Profiles.Model"
import { StatusChipView, ChipColor } from "../../../uikit/label/StatusChipView"

interface ProfileStatusTypeViewProps {
  id?: string
  statusType: ProfileStatusType
}

export const ProfileStatusTypeView = (props: ProfileStatusTypeViewProps) => {
  const { t } = useTranslation("profiles")
  const { id, statusType } = props
  return <StatusChipView id={id} chipColor={statusChipColor(statusType)} label={formatStatusTypeLabel(statusType, t)} />
}

const statusChipColor = (statusType: ProfileStatusType) => {
  switch (statusType) {
    case ProfileStatusType.ACTIVE:
      return ChipColor.GREEN
    case ProfileStatusType.BLOCKED:
      return ChipColor.RED
    case ProfileStatusType.NOT_CREATED:
      return ChipColor.RED
  }
}

const formatStatusTypeLabel = (statusType: ProfileStatusType, t: TFunction) => {
  switch (statusType) {
    case ProfileStatusType.ACTIVE:
      return t("status.ACTIVE")
    case ProfileStatusType.BLOCKED:
      return t("status.BLOCKED")
    case ProfileStatusType.NOT_CREATED:
      return t("status.NOT_CREATED")
  }
}
