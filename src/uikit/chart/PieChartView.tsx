import { PieChart, Pie, Cell, Legend, Label, ResponsiveContainer } from "recharts"
import { formatNumber, formatNumberString } from "../../domain/Domain.Formatters"
import { ChartConfig } from "./ChartConfig"

interface PieChartViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[]
  chartConfig: Record<string, ChartConfig>
}

export const PIE_CHART_VIEW_HEIGHT = 300
const cellInfoBoxHeight = 37.5
const cellInfoVirtHeight = 200

export const PieChartView = (props: PieChartViewProps) => {
  const { data, chartConfig: pieMetadata } = props
  const total = data.reduce((sum, item) => sum + parseFloat(item.value), 0)
  const unitOf = pieMetadata[data[0].id].unit
  const cellInfoVirtDistance = cellInfoVirtHeight / data.length

  return (
    <ResponsiveContainer>
      <PieChart height={PIE_CHART_VIEW_HEIGHT}>
        <Legend
          verticalAlign="top"
          height={9}
          align="left"
          iconType="circle"
          iconSize={9}
          wrapperStyle={{ fontSize: 11 }}
          formatter={(value) => <span style={{ color: "#000000", fontSize: 12 }}>{value}</span>}
          payload={data
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((entry) => {
              const meta = pieMetadata[entry.id]
              return {
                id: meta.title,
                value: meta.title,
                type: "circle",
                color: meta.color,
              }
            })}
        />
        <Pie
          data={data}
          cx={cellInfoVirtHeight / 2}
          cy={PIE_CHART_VIEW_HEIGHT / 2}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {/*the pie slices*/}
          {data.map((entry) => (
            <Cell key={`cell-pie-${entry.id}`} fill={pieMetadata[entry.id].color} />
          ))}

          {/*center labels*/}
          <Label
            value={formatNumberString(total.toFixed(2))}
            position="centerBottom"
            fontSize={15}
            fontWeight={500}
            dy={-5}
          />
          <Label value={unitOf} position="centerTop" fontSize={11} dy={5} />

          {/*more info boxes*/}
          {data.map((entry, index) => {
            const meta = pieMetadata[entry.id]
            return (
              <Label
                key={`cell-info-${entry.id}`}
                content={(value) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const viewBox: any = value.viewBox
                  return (
                    <g
                      transform={`translate(${230},${Math.round(
                        // go to the vertical center of graph -> can be offset by legend
                        parseInt(viewBox.cy || PIE_CHART_VIEW_HEIGHT / 2) +
                          // and vertical center it within its bound
                          +cellInfoVirtDistance / 2 -
                          // offset by half of its own expected height
                          cellInfoBoxHeight / 2 +
                          // calc distance to center based on amount of entries
                          (index - data.length / 2) * cellInfoVirtDistance,
                      )})`}
                    >
                      {meta.icon && <meta.icon />}
                      <g transform={"translate(50,16)"}>
                        <text fontSize={15} fontWeight={"500"} dy={0}>{`${Math.round(
                          (entry.value / total) * 100,
                        )}%`}</text>
                        <text fontSize={11} dy={20}>{`${formatNumber(
                          Math.round(parseFloat(entry.value) * 100) / 100,
                        )} ${meta?.unit}`}</text>
                      </g>
                    </g>
                  )
                }}
              />
            )
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makePieData = (entry: Record<string, any>) => {
  return Object.keys(entry).map((key) => {
    let order = 0
    switch (key) {
      case "totalProduction":
        order = 0
        break
      case "totalHighTariff":
        order = 1
        break
      case "totalLowTariff":
        order = 2
        break
      default:
        break
    }
    return {
      id: key,
      value: parseFloat(entry[key]),
      order,
    }
  })
}
