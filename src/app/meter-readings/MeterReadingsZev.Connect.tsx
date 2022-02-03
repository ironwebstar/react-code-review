import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { MeterReadingsZevComponent } from "./MeterReadingsZev.Component"
import { MeterReadingsActionType } from "./MeterReadings.Epic"
import { MeterReadingDateRange } from "../../domain/meter-readings/MeterReadings.Model"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.meterReadingsZev,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevMeterReadings: (zevId: string, selectedDate: number, meterReadingDateRange: MeterReadingDateRange) => {
      dispatch({
        type: MeterReadingsActionType.METER_READINGS_ZEV_GET,
        zevId: zevId,
        selectedDate: selectedDate,
        meterReadingDateRange: meterReadingDateRange,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeterReadingsZevComponent)
