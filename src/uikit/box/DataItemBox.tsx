import { Stack, Box } from "@mui/material"
import { isValidElement } from "react"
import { appThemeSecondaryColor } from "../../app/Shared.Theme"
import { Body1, Caption } from "../typography/Typography"

interface DataItemBoxProps {
  id?: string
  title: string
  value?: string | React.ReactNode
}

export const DataItemBox = (props: DataItemBoxProps) => {
  const { id, title, value } = props
  return (
    <Stack>
      <Box pl={1} pt={1} pr={1}>
        <Caption
          id={id ? `data-item-box-title-${id}` : undefined}
          sx={{
            color: appThemeSecondaryColor,
          }}
        >
          {title}
        </Caption>
      </Box>
      <Box id={id ? `data-item-box-value-${id}` : undefined} pl={1} pb={1} pr={1}>
        {isValidElement(value) && value}
        {!isValidElement(value) && (value ? <Body1>{value}</Body1> : "-")}
      </Box>
    </Stack>
  )
}
