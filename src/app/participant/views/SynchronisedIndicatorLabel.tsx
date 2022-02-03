import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { AlignItemsCenterBox } from "../../../uikit/box/AlignmentBox"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { SynchronisedIndicator } from "./SynchronisedIndicator"

interface SynchronisedIndicatorLabelProps {
  synchronised: boolean
}

export const SynchronisedIndicatorLabel = (props: SynchronisedIndicatorLabelProps) => {
  const { synchronised } = props
  return (
    <AlignItemsCenterBox>
      <SynchronisedIndicator synchronised={synchronised} />
      <DividerBox />
      <IndicatorLabel synchronised={synchronised} />
    </AlignItemsCenterBox>
  )
}

const IndicatorLabel = (props: SynchronisedIndicatorLabelProps) => {
  const { t } = useTranslation("participant")
  const { synchronised } = props
  switch (synchronised) {
    case true:
      return (
        <Typography variant="h6" color="green">
          {t("detail.label.synced")}
        </Typography>
      )
    case false:
      return (
        <Typography variant="h6" color="red">
          {t("detail.label.unsynced")}
        </Typography>
      )
  }
}
