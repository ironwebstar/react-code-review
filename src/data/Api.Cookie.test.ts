import { createCookie } from "./Api.Cookie"

test("Create a cookie", async () => {
  // given
  const document = {
    cookie: "",
  }

  // when
  createCookie("jwttokenrefresh_ckw", "REFRESH_TOKEN", document as Document)

  // then
  expect(document.cookie).toEqual("jwttokenrefresh_ckw=REFRESH_TOKEN; path=/")
})
