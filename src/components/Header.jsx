// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { logoutUser } from '../components/redux/actions/userActions'
// import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons'

// export default function Header() {
//   const user = useSelector((s) => s.user.current)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     dispatch(logoutUser())
//     navigate('/login')
//   }

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="text-xl font-semibold text-slate-800">Assignment Dashboard</Link>
//         <nav className="flex items-center gap-3">
//           {user ? (
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 text-sm text-slate-600">
//                 <PersonCircle />
//                 <span>{user.name}</span>
//                 <span className="px-2 py-0.5 rounded-md text-xs bg-gray-100">{user.role}</span>
//               </div>
//               <button type="button" onClick={handleLogout} className="flex items-center gap-2 btn-primary">
//                 <BoxArrowRight />
//                 <span>Logout</span>
//               </button>
//             </div>
//           ) : (
//             <Link to="/login" className="btn-primary">Login</Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   )
// }
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../components/redux/actions/userActions'
import { PersonCircle, BoxArrowRight, List, X } from 'react-bootstrap-icons'

export default function Header() {
  const user = useSelector((s) => s.user.current)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
    setMenuOpen(false)
  }

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-bold text-white hover:text-indigo-100 transition-colors duration-200 flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="hidden sm:inline">Assignment Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <PersonCircle className="text-white text-xl" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{user.name}</span>
                    <span className="text-xs text-indigo-100">{user.role}</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 bg-white/90 hover:bg-white text-indigo-600 font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <BoxArrowRight className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white/90 hover:bg-white text-indigo-600 font-medium px-6 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="text-2xl" /> : <List className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <PersonCircle className="text-white text-2xl" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-white">{user.name}</span>
                      <span className="text-sm text-indigo-100">{user.role}</span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleLogout} 
                    className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-indigo-600 font-medium px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md"
                  >
                    <BoxArrowRight className="text-lg" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="block text-center bg-white/90 hover:bg-white text-indigo-600 font-medium px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </header>
  )
}