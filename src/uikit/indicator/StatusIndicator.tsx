interface StatusIndicatorProps {
  color: string
}

export const StatusIndicator = (props: StatusIndicatorProps) => {
  const { color } = props
  return (
    <div
      style={{
        width: 16,
        height: 16,
        backgroundColor: color,
        borderRadius: 16,
      }}
    ></div>
  )
}
