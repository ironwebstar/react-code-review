import { domainDependencies } from "../domain/Domain.Dependencies"
import localeDateDE from "date-fns/locale/de"
import localeDateEN from "date-fns/locale/en-US"

const baseUrl = (hostname: string) => {
  const host = process.env["APP_ENDPOINT"] || hostname

  switch (host) {
    case "localhost":
      return host
    case process.env.APP_ENDPOINT:
      return host
    /* PROD */
    case "zev.ckw.ch":
      return "https://api.ckw-prod.noumenadigital.com"
    case "zevadmin.ckw.ch":
      return "https://api.ckw-prod.noumenadigital.com"
    /* STAGING */
    case "zevdemo.ckw.ch":
      return "https://api.ckw-staging.noumenadigital.com"
    case "zevadmindemo.ckw.ch":
      return "https://api.ckw-staging.noumenadigital.com"
    /* TEST */
    case "adminportal.ckw-test.noumenadigital.com":
      return "https://api.ckw-test.noumenadigital.com"
    case "verwalterportal.ckw-test.noumenadigital.com":
      return "https://api.ckw-test.noumenadigital.com"
    /* DEV */
    case "adminportal.ckw-dev.noumenadigital.com":
      return "https://api.ckw-dev.noumenadigital.com"
    case "verwalterportal.ckw-dev.noumenadigital.com":
      return "https://api.ckw-dev.noumenadigital.com"

    default:
      throw new Error(`${host} api domain is not supported`)
  }
}

const assertNotUndefined = (value: string | undefined, key: string): string => {
  if (!value) throw Error(`env var ${key} not set`)
  return value
}

export const DOMAIN_DEPENDENCIES = domainDependencies({
  baseUrl: baseUrl(process.env.NODE_ENV === "test" ? "localhost" : window.location.hostname),
  appName: assertNotUndefined(process.env.APP_NAME, "APP_NAME"),
  locale: getLocale(assertNotUndefined(process.env.APP_LANG, "APP_LANG")),
})

function getLocale(lang: string) {
  switch (lang) {
    case "en":
      return localeDateEN
    case "de":
      return localeDateDE
    default:
      throw Error("language not found")
  }
}
