import { CSSProperties } from "react"

export interface ChartConfig {
  id: string
  color: string
  unit: string
  type?: "circle" | "line" | "area"
  title?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
  iconFill?: string
  iconStroke?: string
  iconStyle?: CSSProperties
  opacity?: number
}
