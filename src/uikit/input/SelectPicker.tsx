import { Select, MenuItem, SelectProps, FormControl, InputLabel, FormHelperText } from "@mui/material"

interface SelectPickerProps {
  helperText?: string
  emptyValue: string
  items: SelectItem[]
}

interface SelectItem {
  label: string
  value: string | number
}

export function SelectPicker<T>(props: SelectPickerProps & SelectProps<T>) {
  const { emptyValue, helperText, required, label, items, name, value, onBlur, onChange, multiple } = props
  return (
    <FormControl
      required={required}
      variant="standard"
      error={helperText !== undefined}
      sx={{
        width: "100%",
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select variant="standard" name={name} value={value} multiple={multiple} onChange={onChange} onBlur={onBlur}>
        <MenuItem value="">
          <em>{emptyValue}</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
