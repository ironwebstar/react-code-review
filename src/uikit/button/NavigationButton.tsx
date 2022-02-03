import Typography from "@mui/material/Typography"
import ButtonBase from "@mui/material/ButtonBase"
import Grid from "@mui/material/Grid"
import { TinyPaddedBox } from "../box/PaddedBox"
import { appThemeSecondaryColor } from "../../app/Shared.Theme"
import { Icon } from "@mui/material"

interface NavigationButtonProps {
  icon?: React.ReactNode
  label: string
  selected?: boolean
  onClick?: () => void
}

export const NavigationButton = (props: NavigationButtonProps) => {
  const { icon, label, selected, onClick } = props
  return (
    <ButtonBase onClick={onClick}>
      <Grid container alignItems="center" direction="row">
        {icon && (
          <TinyPaddedBox>
            <Icon
              sx={{
                color: selected ? appThemeSecondaryColor : "text.primary",
                fontWeight: selected ? "bold" : "normal",
              }}
            >
              {icon}
            </Icon>
          </TinyPaddedBox>
        )}
        <TinyPaddedBox
          sx={{
            flex: 1,
          }}
        >
          <Typography
            align="left"
            variant="h6"
            sx={{
              color: selected ? appThemeSecondaryColor : "text.primary",
              fontWeight: selected ? "bold" : "normal",
              borderBottom: selected ? `6px solid ${appThemeSecondaryColor}` : "6px solid #FFFFFF",
            }}
          >
            {label}
          </Typography>
        </TinyPaddedBox>
      </Grid>
    </ButtonBase>
  )
}
