import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ContractsActionType } from "./Contracts.Epic"
import { ContractsListComponent } from "./ContractsList.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.contractsList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getInitialContracts: () => {
      dispatch({
        type: ContractsActionType.CONTRACTS_LIST_GET,
      })
    },
    navigateToContract: (contractId: string) => {
      dispatch(push(`/contracts/${contractId}`))
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
    navigateToProduct: (productId: string) => {
      dispatch(push(`/products/${productId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractsListComponent)
