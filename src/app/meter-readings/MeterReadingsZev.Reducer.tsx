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
import { ZevMeterReading } from "../../domain/meter-readings/MeterReadings.Model"

export interface MeterReadingsZevState {
  viewState: ViewState<ZevMeterReading>
}

const initialState: MeterReadingsZevState = {
  viewState: initialViewState(),
}

export const meterReadingsZevReducer = (state: MeterReadingsZevState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(MeterReadingsActionType.METER_READINGS_ZEV_GET):
      return {
        ...state,
        viewState: startLoading<ZevMeterReading>(state.viewState),
      }
    case asSuccess(MeterReadingsActionType.METER_READINGS_ZEV_GET):
      return {
        ...state,
        viewState: withDomainResult<ZevMeterReading>(state.viewState, action.result),
      }
    case asError(MeterReadingsActionType.METER_READINGS_ZEV_GET):
      return {
        ...state,
        viewState: withDomainError<ZevMeterReading>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        viewState: initialViewState<ZevMeterReading>(),
      }
    default:
      return {
        ...state,
      }
  }
}
