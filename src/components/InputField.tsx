import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

type Props = {
  label: string
  name: string
  placeholder?: string
  register: UseFormRegister<any>
  errors?: FieldErrors
  type?: string
}

export default function InputField({ label, name, placeholder, register, errors, type = 'text' }: Props) {
  const hasError = !!errors?.[name]
  const errorMessage = hasError ? (errors as any)[name]?.message : null

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        {...register(name, {
          required: `${label} is required`,
          valueAsNumber: type === 'number',
          min: name === 'day' ? 1 : undefined,
          max: name === 'day' ? 31 : name === 'month' ? 12 : undefined,
          validate: (v) => {
            if (name === 'year') {
              const num = Number(v)
              if (Number.isNaN(num)) return 'Invalid year'
              if (num < 1900) return 'Year too small'
              if (num > new Date().getFullYear()) return 'Year in future'
            }
            return true
          }
        })}
        type={type}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring ${hasError ? 'border-red-500' : 'border-gray-300'}`}
      />
      {hasError && <p className="text-red-600 text-xs mt-1">{String(errorMessage)}</p>}
    </div>
  )
}
