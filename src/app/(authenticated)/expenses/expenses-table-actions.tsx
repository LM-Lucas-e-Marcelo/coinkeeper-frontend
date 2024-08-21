import { FiArrowRight } from '@/assets/icons'
import Link from 'next/link'

export const TableActions = ({ expenseId }: { expenseId: number }) => {
  return (
    <Link
      href={`/expenses/${expenseId}`}
      className="w-[50%] flex justify-center"
    >
      <FiArrowRight size={20} className="text-primary" />
    </Link>
  )
}
