import React, { useEffect } from 'react'

export default function SuccessModal({ open, onClose }) {
  if (!open) return null

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2000) // auto close after 2s
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center animate-bounce-in">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <div className="w-6 h-6 bg-green-600 rounded-full animate-ping"></div>
        </div>
        <h3 className="text-lg font-semibold text-green-700">Submission Successful!</h3>
        <p className="text-sm text-slate-600 mt-2">Your submission has been recorded.</p>
      </div>
    </div>
  )
}
