import { api } from './api-client'

export interface ICharge {
  id: number
  name: string
  totalDebt: number
  totalParcels: number
  parcelActual: number
}

export interface ICharges {
  totalReceiver: number
  totalClientsInDebt: number
  customers: ICharge[]
}

export interface IGetCharges {
  [key: string]: string
}

export async function getCharges(
  props: IGetCharges,
): Promise<{ charges: ICharges }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props).map(([key, value]) => queryParams.append(key, value))
  }

  const result = api.get(
    `pendings/customers/charge?${queryParams.toString()}`,
    {
      next: {
        tags: ['charges'],
      },
    },
  )

  const charges = await result.json<ICharges>()

  return { charges }
}
