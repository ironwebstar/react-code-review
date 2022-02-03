import { StatusType } from "../Domain.Model"

export interface ZevsList {
  zevs: ZevListItem[]
  page: {
    limit: number
    currentPage: number
    totalElements: number
    totalPages: number
  }
}

export interface ZevListItem {
  id: string
  name: string
  statusType: StatusType
  address: string
}
