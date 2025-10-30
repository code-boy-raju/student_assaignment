
// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { loginUser } from '../redux/actions/userActions'
// import { useNavigate } from 'react-router-dom'

// export default function Login() {
//   const [name, setName] = useState('')
//   const [role, setRole] = useState('student')
//   const [error, setError] = useState('')
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleLogin = (e) => {
//     e.preventDefault()
//     if (!name.trim()) {
//       setError('Please enter your name')
//       return
//     }
//     setError('')
//     const userData = {
//       id: Date.now(),
//       name: name.trim(),
//       role,
//     }
//     dispatch(loginUser(userData))
//     localStorage.setItem('currentUser', JSON.stringify(userData))
//     navigate(role === 'admin' ? '/admin' : '/student')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-slate-800 relative overflow-hidden">
//       <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />

//       <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
//         <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Welcome Back</h1>
//         <p className="text-center text-slate-500 mb-8">Sign in to access your dashboard</p>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
//             >
//               <option value="student">Student</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {error && <p className="text-sm text-red-600">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2.5 mt-4 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
//           >
//             Continue
//           </button>
//         </form>

//         <div className="mt-8 text-center text-xs text-slate-500">
//           © {new Date().getFullYear()} Assignment Dashboard. All rights reserved.
//         </div>
//       </div>
//     </div>
//   )
// }
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { PersonCircle, ShieldCheck, ArrowRight } from 'react-bootstrap-icons'

export default function Login() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    setError('')
    setIsLoading(true)
    
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: name.trim(),
        role,
      }
      dispatch(loginUser(userData))
      localStorage.setItem('currentUser', JSON.stringify(userData))
      navigate(role === 'admin' ? '/admin' : '/student')
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 relative overflow-hidden p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-md transform transition-all duration-300 hover:shadow-indigo-500/20">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 duration-300">
            <span className="text-white text-3xl font-bold">A</span>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Welcome Back
        </h1>
        <p className="text-center text-slate-500 mb-8 text-sm sm:text-base">
          Sign in to access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <PersonCircle className="text-indigo-600" />
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-slate-300 bg-white"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" />
              Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  role === 'student'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-shake">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl py-3.5 mt-4 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="text-lg" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Assignment Dashboard. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}