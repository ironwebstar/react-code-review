import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { MeterReadingsIntraDayComponent } from "./MeterReadingsIntraDay.Component"
import { MeterReadingsActionType } from "./MeterReadings.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.meterReadingsIntraDay,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getIntraDayMeterReadings: (zevId: string, startDate: number, endDate: number) => {
      dispatch({
        type: MeterReadingsActionType.METER_READINGS_INTRA_DAY_GET,
        zevId: zevId,
        startDate: startDate,
        endDate: endDate,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeterReadingsIntraDayComponent)
