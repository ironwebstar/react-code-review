import { ButtonBase, Grid, Menu, MenuItem, Typography, Box } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { AlignEndBox } from "../../../uikit/box/AlignmentBox"
import { TinyPaddedBox, TinyPaddedHorizontalBox } from "../../../uikit/box/PaddedBox"
import { UserProfileIcon } from "../../../uikit/Shared.Icon"
import { AppRouteParams } from "../../App.Routes"
import { AppBreadcrumb } from "../../App.Breadcrumb"
import { AppLogo } from "./AppLogo"

export interface AppHeaderViewProps {
  navigateRoot: () => void
  navigateMyProfile: () => void
  navigateSettings: () => void
  logout: (previousPathname?: string) => void
}

export const AppHeaderView = (props: AppHeaderViewProps & RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("appContainer")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { navigateRoot, navigateMyProfile, navigateSettings, logout } = props

  return (
    <TinyPaddedBox
      sx={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #DDDDDD",
      }}
    >
      <Grid container justifyContent="flex-start">
        <Box width={286}>
          <ButtonBase onClick={() => navigateRoot()}>
            <AppLogo />
          </ButtonBase>
        </Box>
        <AppBreadcrumb {...props} />
        <AlignEndBox sx={{ flex: 1 }}>
          <ButtonBase onClick={handleClick}>
            <Grid container alignItems="center">
              <UserProfileIcon fontSize="large" color="secondary" />
              <TinyPaddedHorizontalBox>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {t("header.profile")}
                </Typography>
              </TinyPaddedHorizontalBox>
            </Grid>
          </ButtonBase>
        </AlignEndBox>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            navigateMyProfile()
          }}
        >
          {t("header.profile.menu.myprofile")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            navigateSettings()
          }}
        >
          {t("header.profile.menu.settings")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            logout()
          }}
        >
          {t("header.profile.menu.logout")}
        </MenuItem>
      </Menu>
    </TinyPaddedBox>
  )
}
