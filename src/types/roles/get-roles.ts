export interface IRole {
  id: number
  name: string
}

export interface IRoles {
  items: IRole[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}
