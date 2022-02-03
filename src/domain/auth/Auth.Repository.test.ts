import * as sinon from "sinon"
import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"
import { AdminSessionApi } from "../../data/generated-sources/openapi/api"
import { createAdminSession, refreshAdminSession } from "./Auth.Repository"
import { lastValueFrom } from "rxjs"

const domainDependencies = testDomainDependencies()

test("Create an admin session", async () => {
  // given
  const adminSessionApiStub = sinon.createStubInstance(AdminSessionApi)
  adminSessionApiStub.createAdminSession
    .withArgs({
      username: "sam@noumenadigital.com",
      password: "reactiveX",
    })
    .returns(
      ajaxSuccess({
        token: "token",
        refreshToken: "refreshToken",
      }),
    )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = createAdminSession("sam@noumenadigital.com", "reactiveX", {
    ...domainDependencies,
    adminSessionApi: adminSessionApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })

  // then
  expect(createCookieBearerToken.callCount).toEqual(1)
  expect(createCookieBearerToken.getCall(0).args[0]).toEqual(domainDependencies.config.appName)
  expect(createCookieBearerToken.getCall(0).args[1]).toEqual("token")
  expect(createCookieRefreshToken.callCount).toEqual(1)
  expect(createCookieRefreshToken.getCall(0).args[0]).toEqual(domainDependencies.config.appName)
  expect(createCookieRefreshToken.getCall(0).args[1]).toEqual("refreshToken")
})

test("Refresh an admin session", async () => {
  // given
  const adminSessionApiStub = sinon.createStubInstance(AdminSessionApi)
  adminSessionApiStub.refreshAdminSession
    .withArgs({
      refreshToken: "currentRefreshToken",
    })
    .returns(
      ajaxSuccess({
        token: "token",
        refreshToken: "newRefreshToken",
      }),
    )

  const readCookieRefreshTokenStub = sinon.stub().returns("currentRefreshToken")

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = refreshAdminSession({
    ...domainDependencies,
    adminSessionApi: adminSessionApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
      readCookieRefreshToken: readCookieRefreshTokenStub,
    },
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })

  // then
  expect(createCookieBearerToken.callCount).toEqual(1)
  expect(createCookieBearerToken.getCall(0).args[0]).toEqual(domainDependencies.config.appName)
  expect(createCookieBearerToken.getCall(0).args[1]).toEqual("token")
  expect(createCookieRefreshToken.callCount).toEqual(1)
  expect(createCookieRefreshToken.getCall(0).args[0]).toEqual(domainDependencies.config.appName)
  expect(createCookieRefreshToken.getCall(0).args[1]).toEqual("newRefreshToken")
})
