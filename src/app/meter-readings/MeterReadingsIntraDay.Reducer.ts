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
import { IntraDayMeterReading } from "../../domain/meter-readings/MeterReadings.Model"

export interface MeterReadingsIntraDayState {
  viewState: ViewState<IntraDayMeterReading>
}

const initialState: MeterReadingsIntraDayState = {
  viewState: initialViewState(),
}

export const meterReadingsIntraDayReducer = (state: MeterReadingsIntraDayState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(MeterReadingsActionType.METER_READINGS_INTRA_DAY_GET):
      return {
        ...state,
        viewState: startLoading<IntraDayMeterReading>(state.viewState),
      }
    case asSuccess(MeterReadingsActionType.METER_READINGS_INTRA_DAY_GET):
      return {
        ...state,
        viewState: withDomainResult<IntraDayMeterReading>(state.viewState, action.result),
      }
    case asError(MeterReadingsActionType.METER_READINGS_INTRA_DAY_GET):
      return {
        ...state,
        viewState: withDomainError<IntraDayMeterReading>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        viewState: initialViewState<IntraDayMeterReading>(),
      }
    default:
      return {
        ...state,
      }
  }
}
