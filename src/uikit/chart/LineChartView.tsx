import { useTranslation } from "react-i18next"
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  Label,
  YAxis,
  Line,
  Area,
} from "recharts"
import { getDateLocale } from "../../app/App.i18n"
import { formatNumber } from "../../domain/Domain.Formatters"
import { formatLocale } from "../Shared.Formatters"
import { ChartConfig } from "./ChartConfig"
import { ChartTooltip } from "./ChartTooltip"

interface LineChartDataPoint {
  dateTime: string
}

interface LineChartViewProps {
  dataKey: string
  data: LineChartDataPoint[]
  chartConfig: ChartConfig[]
}

export const INTRA_DAY_METER_CHART_HEIGHT = 300

export const LineChartView = (props: LineChartViewProps) => {
  const { t } = useTranslation("meter-readings")
  const { dataKey, data, chartConfig: linesMetadata } = props
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={data}
        height={INTRA_DAY_METER_CHART_HEIGHT}
        margin={{
          top: 10,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <Legend
          height={90}
          wrapperStyle={{ fontSize: 12 }}
          iconType="circle"
          iconSize={9}
          verticalAlign="top"
          align="left"
          formatter={(value) => <span style={{ color: "#000000", fontSize: 12 }}>{value}</span>}
          payload={linesMetadata.map((line) => ({
            id: line.id,
            value: line.title || "?",
            type: line.type === "area" ? "circle" : "line",
            color: line.color,
          }))}
        />
        <Tooltip
          allowEscapeViewBox={{
            x: true,
            y: true,
          }}
          position={{ y: -(-40 + linesMetadata.length * 25) }}
          cursor={{
            stroke: "#A8D5E221",
            strokeWidth: 10,
          }}
          wrapperStyle={{ left: "-65px" }}
          content={
            <ChartTooltip
              labelFormatter="HH:mm"
              propertyToDisplay={linesMetadata.map((line) => ({
                id: line.id,
                text: line.unit,
                color: line.color,
                type: line.type,
              }))}
            />
          }
        />
        <XAxis
          tickLine={false}
          axisLine={false}
          dataKey={dataKey}
          tickMargin={10}
          tickCount={6}
          tick={{
            fontSize: 11,
            fill: "#313131",
          }}
          tickFormatter={(date) => formatLocale(new Date(date), "HH:mm", getDateLocale())}
        >
          <Label
            content={() => (
              <g transform={`translate(${0},${INTRA_DAY_METER_CHART_HEIGHT - 6})`} fontSize={12}>
                <text textAnchor="start" fill="#313131" fontSize={12}>
                  {t("axis.date")}
                </text>
              </g>
            )}
          />
        </XAxis>
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={0}
          width={30}
          domain={[0, (dataMax: number) => Math.ceil((dataMax / 9) * 10)]}
          tick={(tick: {
            y: number
            payload: {
              value: number
            }
          }) => {
            return (
              <g transform={`translate(${0},${tick.y})`} fontSize={12}>
                <text x={0} y={0} textAnchor="start" fill="#313131">
                  {formatNumber(tick.payload.value)}
                </text>
              </g>
            )
          }}
        >
          <Label
            content={() => {
              return (
                <g fontSize={11}>
                  <text x={0} y={70} textAnchor="start" fill="#313131">
                    kWh
                  </text>
                </g>
              )
            }}
          />
        </YAxis>

        {linesMetadata
          .slice(0)
          .sort((a) => (a.type === "line" ? 1 : -1))
          .map((shape) => {
            if (shape.type === "line") {
              return (
                <Line
                  key={`line-${shape.id}`}
                  type="monotone"
                  dataKey={shape.id}
                  stroke={shape.color}
                  strokeWidth={2}
                  dot={false}
                />
              )
            } else {
              return (
                <Area
                  key={`area-${shape.id}`}
                  type="monotone"
                  dataKey={shape.id}
                  stroke="none"
                  fill={shape.color}
                  fillOpacity={shape.opacity ? shape.opacity : 0.6}
                  activeDot={false}
                />
              )
            }
          })}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
