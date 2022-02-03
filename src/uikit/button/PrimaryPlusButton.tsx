import { PlusIcon } from "../Shared.Icon"
import { FabButton } from "./FabButton"

interface PrimaryPlusButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const PrimaryPlusButton = (props: PrimaryPlusButtonProps) => {
  const { onClick, disabled } = props
  return <FabButton size="medium" icon={<PlusIcon fontSize="large" />} onClick={onClick} disabled={disabled} />
}

export const SmallPrimaryPlusButton = (props: PrimaryPlusButtonProps) => {
  const { onClick, disabled } = props
  return <FabButton size="small" icon={<PlusIcon />} onClick={onClick} disabled={disabled} />
}
