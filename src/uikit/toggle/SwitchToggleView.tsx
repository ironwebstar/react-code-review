import { FormGroup, FormControlLabel, Switch } from "@mui/material"

interface SwitchToggleViewProps {
  label: string
  onChange: (checked: boolean) => void
}

export const SwitchToggleView = (props: SwitchToggleViewProps) => {
  const { label, onChange } = props
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch defaultChecked onChange={(_, checked) => onChange(checked)} />}
        label={label}
      />
    </FormGroup>
  )
}
