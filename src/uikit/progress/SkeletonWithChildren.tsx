import { Skeleton } from "@mui/material"
import { HasChildren } from "../Shared.Prop"

export const SkeletonWithChildren = (props: HasChildren) => {
  const { children } = props
  return <Skeleton animation="wave">{children}</Skeleton>
}
