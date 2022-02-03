import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BillingsRecurringListComponent } from "./BillingsRecurringList.Component"
import { push } from "connected-react-router"
import { BillingsRecurringActionType } from "./BillingsRecurring.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsRecurringList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getRecurringBillings: () => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_RECURRING_LIST_GET,
      })
    },
    navigateToRecurringBilling: (billingId: string) => {
      dispatch(push(`/billings/recurring/details/${billingId}`))
    },
    navigateToRecurringBillingCreate: () => {
      dispatch(push("/billings/recurring/create"))
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsRecurringListComponent)
