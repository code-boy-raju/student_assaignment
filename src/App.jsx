import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/pages/Login'
import StudentDashboard from './components/pages/StudentDashboard'
import AdminDashboard from './components/pages/AdminDashboard'
import Header from './components/Header'
import { useSelector } from 'react-redux'

export default function App() {
  const user = useSelector((state) => state.user.current)

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <Header />
      <main className="p-4 md:p-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={user && user.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/student') : '/login'} replace />} />
        </Routes>
      </main>
    </div>
  )
}