import React from 'react'

export default function ConfirmationModal({ open, title, children, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md border">Cancel</button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 rounded-md bg-blue-600 text-white">Confirm</button>
        </div>
      </div>
    </div>
  )
}