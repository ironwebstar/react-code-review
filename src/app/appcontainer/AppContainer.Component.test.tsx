import { render } from "@testing-library/react"
import { Redirect } from "react-router-dom"
import { AuthGuard } from "./AppContainer.Component"
import { renderWithRouter } from "../../jest.utils"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"

test("The AuthGuard displays a progress bar", () => {
  const { container } = render(
    <AuthGuard
      viewState={{
        isLoading: true,
      }}
      checkSession={() => void 0}
    >
      children
    </AuthGuard>,
  )
  expect(container).toEqual(render(<ProgressIndicator />).container)
})

test("The AuthGuard redirects to /signin", () => {
  const { container } = renderWithRouter(
    <AuthGuard
      viewState={{
        isLoading: false,
        domainError: {
          code: "",
          message: "",
        },
      }}
      checkSession={() => void 0}
    >
      children
    </AuthGuard>,
  )
  expect(container).toEqual(renderWithRouter(<Redirect to="/signin" />).container)
})

test("The AuthGuard displays it's children", () => {
  const { container } = renderWithRouter(
    <AuthGuard
      viewState={{
        isLoading: false,
        domainResult: true,
      }}
      checkSession={() => void 0}
    >
      <>children</>
    </AuthGuard>,
  )
  expect(container).toEqual(render(<>children</>).container)
})
