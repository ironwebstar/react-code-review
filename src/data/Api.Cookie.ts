export type ReadCookie = (name: string, document: Document) => string

export type CreateCookie = (name: string, value: string | undefined, document: Document, days?: number) => void

export interface ApiCookie {
  readCookieBearerToken: ReadCookie
  createCookieBearerToken: CreateCookie
  readCookieRefreshToken: ReadCookie
  createCookieRefreshToken: CreateCookie
  removeCookies: (appName: string, document: Document) => void
}

export const readCookieBearerToken = (appName: string, document: Document) =>
  readCookie(`jwttoken_${appName}`, document)

export const createCookieBearerToken = (appName: string, value: string | undefined, document: Document) =>
  createCookie(`jwttoken_${appName}`, value, document)

export const readCookieRefreshToken = (appName: string, document: Document) =>
  readCookie(`jwttokenrefresh_${appName}`, document)

export const createCookieRefreshToken = (appName: string, value: string | undefined, document: Document) =>
  createCookie(`jwttokenrefresh_${appName}`, value, document)

export const removeCookies = (appName: string, document: Document) => {
  eraseCookie(`jwttoken_${appName}`, document)
  eraseCookie(`jwttokenrefresh_${appName}`, document)
}

export const createCookie = (name: string, value: string | undefined, document: Document, days?: number): void => {
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + value + expires + "; path=/"
}

export const readCookie = (name: string, document: Document): string => {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return ""
}

export const eraseCookie = (name: string, document: Document): void => {
  createCookie(name, "", document, -1)
}
