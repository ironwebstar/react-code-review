import { FabButton } from "./FabButton"
import { EditIcon } from "../Shared.Icon"

interface PrimaryEditButtonProps {
  id?: string
  onClick: () => void
}

export const PrimaryEditButton = (props: PrimaryEditButtonProps) => {
  const { id, onClick } = props
  return <FabButton id={id ? id : "primary-edit-button"} size="medium" icon={<EditIcon />} onClick={onClick} />
}
