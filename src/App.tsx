import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="container p-8 bg-white shadow-xl rounded-2xl">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}