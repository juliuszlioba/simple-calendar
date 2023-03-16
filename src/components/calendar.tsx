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
      <div className="col-span-7 flex justify-between">
        <h2>{format(activeDate, "LLLL", { locale: lt })}</h2>
        <div>
          <button
            onClick={() => {
              setActiveDate(new Date())
            }}
          >
            Today
          </button>
          <button onClick={() => setActiveDate(subMonths(activeDate, 1))}>
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button onClick={() => setActiveDate(addMonths(activeDate, 1))}>
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
        <div key={`week-${day}`}>
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
          className={`day ${
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
      <div key={format(currentDate, "w")} className="grid grid-cols-7">
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

    return <div>{allWeeks}</div>
  }

  return (
    <div className="flex flex-col">
      {getHeader()}
      {getWeekDaysNames()} {getDates()}
    </div>
  )
}
