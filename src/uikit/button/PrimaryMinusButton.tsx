import { MinusIcon } from "../Shared.Icon"
import { FabButton } from "./FabButton"

interface SmallPrimaryMinusButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const SmallPrimaryMinusButton = (props: SmallPrimaryMinusButtonProps) => {
  const { onClick, disabled } = props
  return <FabButton size="small" icon={<MinusIcon />} onClick={onClick} disabled={disabled} />
}
