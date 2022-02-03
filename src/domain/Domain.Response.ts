export interface DomainError {
  code: string
  message: string
}

export interface DomainResponse<T> {
  type: "ok" | "error"
  result?: T
  error?: DomainError
}

export function createOkResponse<T>(result?: T): DomainResponse<T> {
  return {
    type: "ok",
    result: result,
  }
}

export function createErrorResponse<T>(code: string, message: string): DomainResponse<T> {
  return {
    type: "error",
    error: {
      code: code,
      message: message,
    },
  }
}
