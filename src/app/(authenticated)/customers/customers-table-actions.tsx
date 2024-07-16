import { FiArrowRight } from '@/assets/icons'
import Link from 'next/link'

export const TableActions = ({ customerId }: { customerId: number }) => {
  return (
    <Link
      href={`/customers/${customerId}`}
      className="w-[50%] flex justify-center"
    >
      <FiArrowRight size={20} className="text-primary" />
    </Link>
  )
}
