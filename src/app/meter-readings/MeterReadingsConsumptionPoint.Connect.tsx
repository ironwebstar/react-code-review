import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { MeterReadingsConsumptionPointComponent } from "./MeterReadingsConsumptionPoint.Component"
import { MeterReadingsActionType } from "./MeterReadings.Epic"
import { MeterReadingDateRange } from "../../domain/meter-readings/MeterReadings.Model"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.meterReadingsConsumptionPoint,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getConsumptionPointMeterReadings: (
      consumptionPointId: string,
      selectedDate: number,
      meterReadingDateRange: MeterReadingDateRange,
    ) => {
      dispatch({
        type: MeterReadingsActionType.METER_READINGS_CONSUMPTION_POINT_GET,
        consumptionPointId,
        selectedDate: selectedDate,
        meterReadingDateRange: meterReadingDateRange,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeterReadingsConsumptionPointComponent)
