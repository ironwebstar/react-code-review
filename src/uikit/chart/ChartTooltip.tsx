import { getDateLocale } from "../../app/App.i18n"
import { appFormattedDateValue, formatNumberString } from "../../domain/Domain.Formatters"

const dotLineStyle = {
  height: "3px",
  width: "9px",
  marginTop: "3px",
  marginBottom: "3px",
  marginRight: "9px",
  display: "inline-block",
}

const dotCircleStyle = {
  height: "9px",
  width: "9px",
  marginRight: "9px",
  borderRadius: "50%",
  display: "inline-block",
}

interface TooltipItemProps {
  value: string
  color: string
  text: string
  type?: string
}

const TooltipItem = (props: TooltipItemProps) => {
  const { value, color, text, type } = props
  let valueFormatted
  if (Array.isArray(value)) {
    const [val1, val2] = value
    valueFormatted = parseFloat(val2) - parseFloat(val1)
  } else {
    valueFormatted = parseFloat(value)
  }
  const dotStyle = !type || type !== "line" ? dotCircleStyle : dotLineStyle
  return (
    <div
      style={{
        width: "136px",
        borderRadius: "2px",
        backgroundColor: "#5a6574",
        color: "#fafafb",
        paddingLeft: "12px",
        paddingBottom: "12px",
        fontSize: "14px",
      }}
    >
      <div style={{ ...dotStyle, backgroundColor: color }} />
      {formatNumberString((valueFormatted ?? 0).toFixed(2))}
      <span style={{ marginLeft: "4px" }}>{text}</span>
    </div>
  )
}

interface IPropertyToDisplay {
  id: string
  text: string
  color: string
}

interface ITooltipPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>
}

interface IChartTooltipProps {
  payload?: ITooltipPayload[]
  label?: string
  active?: boolean
  propertyToDisplay: IPropertyToDisplay[]
  labelFormatter?: string
}

export const ChartTooltip = (props: IChartTooltipProps) => {
  const { payload, label, active, propertyToDisplay, labelFormatter } = props
  const item = payload && payload.length > 0 && payload[0].payload
  if (!active) return null
  if (!item) return null
  if (item?.tooltip === false) return null
  return (
    <div
      style={{
        width: "148px",
        borderRadius: "2px",
        boxShadow: "0 2px 4px 0 #dbdfdb",
        backgroundColor: "#5a6574",
        paddingTop: "2px",
        paddingBottom: "2px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fafafb",
            padding: "16px",
          }}
        >
          {showDisplayLabel(label, labelFormatter)}
        </span>
        {item && (
          <div
            style={{
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            {propertyToDisplay.map((p) => (
              <TooltipItem key={p.id} value={item[p.id]} {...p} />
            ))}
          </div>
        )}
      </div>
      <div
        style={{
          content: "",
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          margin: "0 auto",
          width: 0,
          height: 0,
          borderTop: "solid 10px #5a6574",
          borderLeft: "solid 7px transparent",
          borderRight: "solid 7px transparent",
        }}
      />
    </div>
  )
}

const showDisplayLabel = (label?: string, labelFormatter?: string) => {
  if (label) {
    try {
      return appFormattedDateValue(new Date(label), getDateLocale(), labelFormatter ?? "dd. MM.")
    } catch (err) {
      return "?"
    }
  }
  return "?"
}
