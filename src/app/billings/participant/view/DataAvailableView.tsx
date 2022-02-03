import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { AlignBottomBox } from "../../../../uikit/box/AlignmentBox"
import { CrossIcon, TickIcon } from "../../../../uikit/Shared.Icon"

interface DataAvailableViewProps {
  isDataAvailable: boolean
}

export const DataAvailableView = (props: DataAvailableViewProps) => {
  const { t } = useTranslation()
  const { isDataAvailable } = props
  switch (isDataAvailable) {
    case true:
      return (
        <AlignBottomBox>
          <TickIcon
            sx={{
              color: "green",
            }}
          />
          <Typography
            sx={{
              color: "green",
            }}
            variant="body1"
          >
            {t("shared:label.ok")}
          </Typography>
        </AlignBottomBox>
      )
    case false:
      return (
        <AlignBottomBox>
          <CrossIcon
            sx={{
              color: "red",
            }}
          />
          <Typography
            sx={{
              color: "red",
            }}
            variant="body1"
          >
            {t("shared:label.error")}
          </Typography>
        </AlignBottomBox>
      )
  }
}
