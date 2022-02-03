import { domainDependencies, DomainDependencies } from "./Domain.Dependencies"
import localeDateDE from "date-fns/locale/de"

export const testDomainDependencies = (): DomainDependencies => {
  return {
    ...domainDependencies({
      baseUrl: "test://localhost",
      appName: "ckwtest",
      locale: localeDateDE,
    }),
  }
}

export function ajaxSuccess<T>(data: T) {
  return Promise.resolve({
    data: data,
    status: 200,
    statusText: "ok",
    headers: {},
    config: {},
  })
}
