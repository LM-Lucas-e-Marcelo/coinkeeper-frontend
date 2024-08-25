'use client'

import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from '@/assets/icons'
import { useUrlParams } from '@/hooks/use-params'
import { formatDateDashboard } from '@/utils/format-date-dashboard'
import { useState } from 'react'

export function MonthCardHeader() {
  const [date, setDate] = useState<Date>(new Date())
  const { addParams } = useUrlParams()

  const handlePrevDate = () => {
    const prevDate = date.setMonth(date.getMonth() - 1)
    setDate(new Date(prevDate))
    addParams({ date: new Date(prevDate).toLocaleString() })
  }

  const handleNextDate = () => {
    const nextDate = date.setMonth(date.getMonth() + 1)
    setDate(new Date(nextDate))
    addParams({ date: new Date(nextDate).toLocaleString() })
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
