import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ResultCard from './ResultCard'
import InputField from './InputField'
import { AgeResult } from '../types'

type FormValues = {
  day: string
  month: string
  year: string
}

function isValidDate(day: number, month: number, year: number) {
  const d = new Date(year, month - 1, day)
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
}

function calculateAge(birthDate: Date, now = new Date()): AgeResult {
  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  let days = now.getDate() - birthDate.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate() // days in previous month
    days += prevMonth
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  if (years < 0) {
    return { years: 0, months: 0, days: 0 }
  }

  return { years, months, days }
}

export default function AgeForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: { day: '', month: '', year: '' }
  })

  // hook #1 useState
  const [result, setResult] = useState<AgeResult | null>(null)
  // hook #2 useRef
  const lastSubmittedRef = useRef<FormValues | null>(null)
  // hook #3 useMemo
  const watched = watch()

  // keep a derived validity memo (example of useMemo)
  const isComplete = useMemo(() => {
    return !!(watched.day && watched.month && watched.year)
  }, [watched.day, watched.month, watched.year])

  useEffect(() => {
    // small side-effect: when result changes, update document title (demonstrate useEffect)
    if (result) {
      document.title = `Age: ${result.years}y ${result.months}m ${result.days}d`
    } else {
      document.title = 'Age Calculator'
    }
  }, [result])

  const onSubmit = handleSubmit((data) => {
    const day = parseInt(data.day, 10)
    const month = parseInt(data.month, 10)
    const year = parseInt(data.year, 10)

    if (!isValidDate(day, month, year)) {
      // set errors by using manual approach: we'll just set result null and alert user via errors prop shown on inputs
      setResult(null)
      return
    }

    const birth = new Date(year, month - 1, day)
    const age = calculateAge(birth, new Date())
    setResult(age)
    lastSubmittedRef.current = data
  })

  const onReset = () => {
    reset()
    setResult(null)
    lastSubmittedRef.current = null
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-3 gap-4">
        <InputField
          label="Day"
          name="day"
          placeholder="DD"
          register={register}
          errors={errors}
          type="number"
        />
        <InputField
          label="Month"
          name="month"
          placeholder="MM"
          register={register}
          errors={errors}
          type="number"
        />
        <InputField
          label="Year"
          name="year"
          placeholder="YYYY"
          register={register}
          errors={errors}
          type="number"
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow"
        >
          Calculate Age
        </button>
        <button type="button" className="underline text-sm text-gray-600" onClick={onReset}>Reset</button>
        <div className="ml-auto text-sm text-gray-500">
          {/* {isComplete ? 'Ready to calculate' : 'Fill all fields'} */}
        </div>
      </div>

      <ResultCard result={result ?? { years: 0, months: 0, days: 0 }} />
    </form>
  )
}
