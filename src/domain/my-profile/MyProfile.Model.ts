import { StatusType } from "../Domain.Model"

export interface MyProfileModel {
  id: string
  name: string
  title: string
  email: string
  telephone: string
  mobile: string
  address: string
  city: string
  isBlocked: boolean
  currentState: StatusType
}

export enum ProfileType {
  ADMIN = "ADMIN",
  ZEV_MANAGER = "ZEV_MANAGER",
}
