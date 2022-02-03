import { ButtonBase, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { AppRouteParams } from "../../App.Routes"
import { AlignBottomBox } from "../../../uikit/box/AlignmentBox"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { TinyPaddedBox } from "../../../uikit/box/PaddedBox"
import { BackIcon } from "../../../uikit/Shared.Icon"

export const AppBackButton = withRouter((props: RouteComponentProps<AppRouteParams>) => {
  const { history } = props
  const { t } = useTranslation()
  return (
    <ButtonBase
      onClick={() => history.goBack()}
      sx={{
        width: "100%",
      }}
    >
      <TinyPaddedBox
        sx={{
          width: "100%",
        }}
      >
        <AlignBottomBox>
          <BackIcon />
          <DividerBox />
          <Typography variant="body1">{t("shared:form.action.back")}</Typography>
        </AlignBottomBox>
      </TinyPaddedBox>
    </ButtonBase>
  )
})
