import TextField, { StandardTextFieldProps } from "@mui/material/TextField"

export const SingleLineTextField = (props: StandardTextFieldProps) => {
  const { id, helperText, InputProps } = props
  return (
    <TextField
      {...props}
      id={id ? `text-field-${id}` : undefined}
      InputLabelProps={{
        id: id ? `text-field-label-${id}` : undefined,
      }}
      sx={{
        width: "100%",
      }}
      error={helperText !== undefined}
      helperText={helperText}
      variant="standard"
      InputProps={InputProps}
    />
  )
}
