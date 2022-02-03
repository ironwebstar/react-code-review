import { useTranslation } from "react-i18next"
import { PaperBox } from "../../uikit/page/PaperBox"
import { SpaceBetweenBox } from "../../uikit/box/AlignmentBox"
import { PageHeader } from "../../uikit/typography/Header"
import { NavigationButton } from "../../uikit/button/NavigationButton"
import { Grid } from "@mui/material"

interface SettingsDetailComponentProps {
  navigateToChangePassword: () => void
}

export const SettingsDetailComponent = (props: SettingsDetailComponentProps) => {
  const { t } = useTranslation("settings")
  const { navigateToChangePassword } = props
  return (
    <PaperBox>
      <SpaceBetweenBox>
        <PageHeader>{t("detail.title")}</PageHeader>
      </SpaceBetweenBox>
      <Grid
        container
        direction="column"
        sx={{
          padding: 1,
        }}
      >
        <NavigationButton
          label={t("detail.navigation.reset-password")}
          selected={false}
          onClick={navigateToChangePassword}
        />
      </Grid>
    </PaperBox>
  )
}
