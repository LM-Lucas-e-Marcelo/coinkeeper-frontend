import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from '@/assets/icons'

import { formatDateDashboard } from '@/utils/format-date-dashboard'
import { Dispatch, SetStateAction } from 'react'

interface MonthCardHeaderProps {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}

export function MonthCardHeader({ date, setDate }: MonthCardHeaderProps) {
  const handlePrevDate = () => {
    const prevDate = date.setMonth(date.getMonth() - 1)
    setDate(new Date(prevDate))
  }

  const handleNextDate = () => {
    const nextDate = date.setMonth(date.getMonth() + 1)
    setDate(new Date(nextDate))
  }

  return (
    <header className="flex justify-between p-3 bg-primary text-white">
      <button onClick={handlePrevDate}>
        <MdOutlineArrowBackIosNew size={22} />
      </button>
      <h1 className="text-xl uppercase">
        {formatDateDashboard(date.toString())}
      </h1>
      <button onClick={handleNextDate}>
        <MdOutlineArrowForwardIos size={22} />
      </button>
    </header>
  )
}
