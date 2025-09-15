import React from 'react'
import { AgeResult } from '../types'

export default function ResultCard({ result }: { result: AgeResult }) {
  return (
    <div className="mt-6 p-4 rounded-lg bg-gray-50 border">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-4xl font-extrabold">{result.years}</div>
          <div className="text-sm text-gray-500">years</div>
        </div>
        <div>
          <div className="text-4xl font-extrabold">{result.months}</div>
          <div className="text-sm text-gray-500">months</div>
        </div>
        <div>
          <div className="text-4xl font-extrabold">{result.days}</div>
          <div className="text-sm text-gray-500">days</div>
        </div>
      </div>
    </div>
  )
}
