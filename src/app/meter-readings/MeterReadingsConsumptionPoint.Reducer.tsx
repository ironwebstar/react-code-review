import { AnyAction } from "redux"
import { MeterReadingsActionType } from "./MeterReadings.Epic"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { LOCATION_CHANGE } from "connected-react-router"
import { ConsumptionPointMeterReading } from "../../domain/meter-readings/MeterReadings.Model"

export interface MeterReadingsConsumptionPointState {
  viewState: ViewState<ConsumptionPointMeterReading>
}

const initialState: MeterReadingsConsumptionPointState = {
  viewState: initialViewState(),
}

export const meterReadingsConsumptionPointReducer = (
  state: MeterReadingsConsumptionPointState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case asStarted(MeterReadingsActionType.METER_READINGS_CONSUMPTION_POINT_GET):
      return {
        ...state,
        viewState: startLoading<ConsumptionPointMeterReading>(state.viewState),
      }
    case asSuccess(MeterReadingsActionType.METER_READINGS_CONSUMPTION_POINT_GET):
      return {
        ...state,
        viewState: withDomainResult<ConsumptionPointMeterReading>(state.viewState, action.result),
      }
    case asError(MeterReadingsActionType.METER_READINGS_CONSUMPTION_POINT_GET):
      return {
        ...state,
        viewState: withDomainError<ConsumptionPointMeterReading>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        viewState: initialViewState<ConsumptionPointMeterReading>(),
      }
    default:
      return {
        ...state,
      }
  }
}
