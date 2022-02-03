import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ContractsActionType } from "./Contracts.Epic"
import { AppState } from "../App.Reducer"
import { ContractsDetailComponent } from "./ContractsDetail.Component"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.contractsDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getContractById: (contractId: string) => {
      dispatch({
        type: ContractsActionType.CONTRACT_GET_BY_ID,
        contractId: contractId,
      })
    },
    replaceContract: (contractId: string, productId: string, endDate: number) => {
      dispatch({
        type: ContractsActionType.CONTRACT_REPLACE,
        contractId: contractId,
        productId: productId,
        endDate: endDate,
      })
    },
    approveContract: (contractId: string) => {
      dispatch({
        type: ContractsActionType.CONTRACT_APPROVE,
        contractId: contractId,
      })
    },
    deleteContract: (contractId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: ContractsActionType.CONTRACT_DELETE,
          contractId: contractId,
        },
      })
    },
    navigateToProduct: (productId: string) => {
      dispatch(push(`/products/${productId}`))
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
    navigateToUpdateContract: (contractId: string) => {
      dispatch(push(`/contracts/${contractId}/update`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractsDetailComponent)
