import { StatusIndicator } from "../../../uikit/indicator/StatusIndicator"

interface SynchronisedIndicatorProps {
  synchronised: boolean
}

export const SynchronisedIndicator = (props: SynchronisedIndicatorProps) => {
  const { synchronised } = props
  switch (synchronised) {
    case true:
      return <StatusIndicator color={"green"} />
    case false:
      return <StatusIndicator color={"red"} />
  }
}
