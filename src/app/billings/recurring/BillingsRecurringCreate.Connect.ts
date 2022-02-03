import { connect } from "react-redux"
import { BillingsRecurringCreateComponent } from "./BillingsRecurringCreate.Component"
import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { BillingsRecurringActionType } from "./BillingsRecurring.Epic"
import { BillingsRecurringUpsert } from "../../../domain/billings/recurring/BillingsRecurring.Model"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsRecurringCreate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createBillingsRecurring: (billingsRecurringCreate: BillingsRecurringUpsert) => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_RECURRING_CREATE,
        billingsRecurringCreate: billingsRecurringCreate,
      })
    },
    getZevs: () => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_RECURRING_ZEVS_GET_LIST,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsRecurringCreateComponent)
