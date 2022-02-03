import { useTranslation } from "react-i18next"
import { BarChart, Label, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, CartesianGrid } from "recharts"
import { getDateLocale } from "../../app/App.i18n"
import { formatLocale } from "../Shared.Formatters"

import { ChartTooltip } from "./ChartTooltip"
import { ChartConfig } from "./ChartConfig"
import { MeterReadingDateRange } from "../../domain/meter-readings/MeterReadings.Model"
import { TFunction } from "i18next"

interface BarChartDataPoint {
  dateTime: string
}

interface BarChartViewProps {
  dataKey: string
  data: BarChartDataPoint[]
  meterReadingDateRange: MeterReadingDateRange
  chartConfig: ChartConfig[]
}

export const BAR_CHART_VIEW_HEIGHT = 300

export const BarChartView = (props: BarChartViewProps) => {
  const { t } = useTranslation("meter-readings")
  const dateLocale = getDateLocale()
  const { dataKey, data, meterReadingDateRange, chartConfig: barsMetadata } = props
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKey}
          tickLine={false}
          axisLine={false}
          tick={{
            fontSize: 11,
          }}
          tickMargin={10}
          tickFormatter={(date) => {
            switch (meterReadingDateRange) {
              case MeterReadingDateRange.YEAR:
                return formatLocale(new Date(date), "LLL", dateLocale)
              case MeterReadingDateRange.MONTH:
                return `${new Date(date).getDate()}`
              case MeterReadingDateRange.WEEK:
                return formatLocale(new Date(date), "EEEEEE", dateLocale)
            }
          }}
        >
          <Label
            content={() => (
              <g transform={`translate(${0},${BAR_CHART_VIEW_HEIGHT - 6})`} fontSize={11}>
                <text textAnchor="start">{formatXAxisLabel(meterReadingDateRange, t)}</text>
              </g>
            )}
          />
        </XAxis>
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={0}
          tickCount={6}
          width={30}
          tick={(tick: {
            y: number
            payload: {
              value: number
            }
          }) => {
            return (
              <g transform={`translate(${0},${tick.y})`} fontSize={11}>
                <text x={0} y={0} textAnchor="start">
                  {tick.payload.value}
                </text>
              </g>
            )
          }}
        >
          <Label
            content={() => {
              return (
                <g fontSize={11}>
                  <text x={0} y={11} textAnchor="start">
                    kWh
                  </text>
                </g>
              )
            }}
          />
        </YAxis>
        <Tooltip
          allowEscapeViewBox={{
            x: true,
            y: true,
          }}
          position={{ y: -(40 + barsMetadata.length * 25) }}
          wrapperStyle={{ left: "-65px" }}
          content={
            <ChartTooltip
              propertyToDisplay={barsMetadata.map(({ id, unit, color }) => ({
                id,
                text: unit,
                color,
              }))}
            />
          }
        />
        {barsMetadata.map((bar) => (
          <Bar key={bar.id} dataKey={bar.id} stackId="bars" fill={bar.color} barSize={8} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

const formatXAxisLabel = (meterReadingDateRange: MeterReadingDateRange, t: TFunction) => {
  switch (meterReadingDateRange) {
    case MeterReadingDateRange.WEEK:
      return t("axis.day")
    case MeterReadingDateRange.MONTH:
      return t("axis.day")
    case MeterReadingDateRange.YEAR:
      return t("axis.month")
  }
}
