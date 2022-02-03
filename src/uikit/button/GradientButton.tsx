/*
  https://brand.ckw.ch/document/82#/umsetzung-digital/pattern-library/buttons-links
*/
import Button, { ButtonTypeMap } from "@mui/material/Button"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"

interface GradientButtonProps {
  id?: string
  label: string
  startColor: string
  endColor: string
}

export const GradientButton = (props: GradientButtonProps & DefaultComponentProps<ButtonTypeMap>) => {
  const { id, label, disabled, startIcon, endIcon, onClick, type, startColor, endColor } = props
  return (
    <Button
      id={id}
      type={type}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      sx={{
        color: "#fff",
        background: `linear-gradient(to bottom,${startColor},${endColor})`,
        backgroundSize: "102%",

        position: "relative",
        cursor: "pointer",
        display: "inline-flex",
        overflow: "hidden",
        userSelect: "none",
        verticalAlign: "middle",
        transition: ".3s ease-out",

        fontSize: "1.001em",
        padding: ".75em 2em",
        lineHeight: "inherit",
        boxShadow: "none",
        borderRadius: "7.144em",
        border: "none",
        textTransform: "inherit",
        zIndex: 1,

        "&:hover": { boxShadow: "none" },

        "&:disabled": {
          color: "#fff",
          opacity: 0.5,
          cursor: "not-allowed",
        },

        "&::before": {
          position: "absolute",
          content: "''",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `linear-gradient(to bottom, ${startColor}, ${startColor})`,
          zIndex: -1,
          transition: ".3s ease-out",
          opacity: 0,
        },
        "&:hover::before": { opacity: 1 },
      }}
    >
      {label}
    </Button>
  )
}
