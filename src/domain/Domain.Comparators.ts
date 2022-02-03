export type SortDirection = "asc" | "desc"

export function ORDERED_STRING_COMPARATOR(a: string, b: string, direction: SortDirection): number {
  switch (direction) {
    case "asc":
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    case "desc":
      return a.toLowerCase() < b.toLowerCase() ? 1 : -1
  }
}

export function ORDERED_BOOLEAN_COMPARATOR(a: boolean, b: boolean, direction: SortDirection): number {
  switch (direction) {
    case "asc":
      return a === b ? 1 : -1
    case "desc":
      return a !== b ? 1 : -1
  }
}

export function ORDERED_NUMBER_COMPARATOR(a: number, b: number, direction: SortDirection): number {
  switch (direction) {
    case "asc":
      return a > b ? 1 : -1
    case "desc":
      return a < b ? 1 : -1
  }
}
