import { applyMiddleware, createStore, compose } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { createLogger } from "redux-logger"
import { appEpic } from "./App.Epic"
import { createAppReducer, historyMiddleWare } from "./App.Reducer"

const epicMiddleware = createEpicMiddleware()
const middleware = [epicMiddleware, historyMiddleWare]

// @ts-expect-error: only for development
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if (process.env.ENV_TYPE === "development") {
  middleware.push(
    createLogger({
      collapsed: true,
    }),
  )
}

export const appStore = createStore(createAppReducer, composeEnhancers(applyMiddleware(...middleware)))

epicMiddleware.run(appEpic)
