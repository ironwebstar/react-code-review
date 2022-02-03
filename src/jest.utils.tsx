import { Router } from "react-router-dom"
import { render } from "@testing-library/react"
import { createMemoryHistory } from "history"

export const renderWithRouter = (ui: JSX.Element) => {
  return {
    ...render(
      <Router
        history={createMemoryHistory({
          initialEntries: ["/"],
        })}
      >
        {ui}
      </Router>,
    ),
    history,
  }
}
