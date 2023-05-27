import { useState } from "react"
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { lt } from "date-fns/locale"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

export default function CustomCalendar() {
  const [activeDate, setActiveDate] = useState(new Date())

  const getHeader = () => {
    return (
      <div className="cap-2 col-span-7 flex items-center justify-between rounded-lg border-2 border-gray-700 p-2 pb-2">
        <h2>{format(activeDate, "LLLL", { locale: lt })}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveDate(new Date())
            }}
            className="hover:text-fuchsia-800"
          >
            Today
          </button>
          <button
            onClick={() => setActiveDate(subMonths(activeDate, 1))}
            className="hover:text-fuchsia-800"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveDate(addMonths(activeDate, 1))}
            className="hover:text-fuchsia-800"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    )
  }

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate, { locale: lt })
    const weekDays = []
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div key={`week-${day}`} className=" p-1 text-center">
          {format(addDays(weekStartDate, day), "E", { locale: lt })}
        </div>
      )
    }
    return <div className="grid grid-cols-7">{weekDays}</div>
  }

  const generateDatesForCurrentWeek = (date: Date, activeDate: Date) => {
    let currentDate = date
    const week = []
    for (let day = 0; day < 7; day++) {
      week.push(
        <div
          key={format(currentDate, "T")}
          className={`day rounded-lg border-2 border-gray-700 p-1 ${
            isSameMonth(currentDate, activeDate) ? "" : "text-gray-500"
          }
          ${isSameDay(currentDate, new Date()) ? "bg-white text-black" : ""}`}
        >
          {format(currentDate, "d", { locale: lt })}
        </div>
      )
      currentDate = addDays(currentDate, 1)
    }
    return (
      <div key={format(currentDate, "w")} className="grid grid-cols-7 gap-2">
        {week}
      </div>
    )
  }

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate)
    const endOfTheSelectedMonth = endOfMonth(activeDate)
    const startDate = startOfWeek(startOfTheSelectedMonth, { locale: lt })
    const endDate = endOfWeek(endOfTheSelectedMonth, { locale: lt })

    let currentDate = startDate

    const allWeeks = []

    while (currentDate <= endDate) {
      allWeeks.push(generateDatesForCurrentWeek(currentDate, activeDate))
      currentDate = addDays(currentDate, 7)
    }

    return <div className="grid gap-2">{allWeeks}</div>
  }

  return (
    <div className="flex flex-col gap-2">
      {getHeader()}
      {getWeekDaysNames()} {getDates()}
    </div>
  )
}
