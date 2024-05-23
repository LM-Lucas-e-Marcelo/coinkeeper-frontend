export interface IUser {
  id: number
  name: string
  username: string
  role: {
    id: number
    name: string
  }
}

export interface IUsers {
  items: IUser[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}
