import { Fab } from "@mui/material"
import { appThemePrimaryColor, appThemeSecondaryColor } from "../../app/Shared.Theme"

interface FabButtonProps {
  id?: string
  icon: React.ReactNode
  onClick: () => void
  disabled?: boolean
  size: "small" | "medium" | "large"
}

export const FabButton = (props: FabButtonProps) => {
  const { id, icon, onClick, disabled, size } = props
  return (
    <Fab
      id={id}
      size={size}
      disabled={disabled}
      onClick={onClick}
      sx={{
        position: "relative",
        right: "initial",
        top: "initial",
        color: "#fff",
        background: `linear-gradient(to bottom,${appThemePrimaryColor},${appThemeSecondaryColor})`,
        backgroundSize: "102%",

        cursor: "pointer",
        display: "inline-flex",
        overflow: "hidden",
        userSelect: "none",
        verticalAlign: "middle",
        transition: ".3s ease-out",

        boxShadow: "none",
        border: "none",

        "&:hover": { boxShadow: "none" },
        "&::before": {
          position: "absolute",
          content: "''",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `linear-gradient(to bottom, ${appThemePrimaryColor}, ${appThemePrimaryColor})`,
          zIndex: -1,
          transition: ".3s ease-out",
          opacity: 0,
        },
        "&:hover::before": { opacity: 1 },
      }}
    >
      {icon}
    </Fab>
  )
}
