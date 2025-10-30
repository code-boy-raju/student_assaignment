
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProgressBar from '../ProgressBar'
import {
  addAssignment,
  editAssignment,
  deleteAssignment,
} from '../redux/actions/assignmentActions'
import {
  Plus,
  Pencil,
  Trash,
  BoxArrowUpRight,
  CheckCircle,
  XCircle,
  X,
} from 'react-bootstrap-icons'

// Toast Notification
function Toast({ message, visible, type = 'success' }) {
  return (
    <div
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 transition-all duration-500 z-50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div
        className={`${
          type === 'error' 
            ? 'bg-gradient-to-r from-red-500 to-red-600' 
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
        } text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[280px] max-w-[90vw]`}
      >
        {type === 'error' ? (
          <XCircle size={20} className="flex-shrink-0" />
        ) : (
          <CheckCircle size={20} className="flex-shrink-0" />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}

// Create Assignment Form
function NewAssignmentForm({ onCreate, creatorId, onSuccess }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [driveLink, setDriveLink] = useState('')

  const isDriveLinkValid = driveLink.startsWith('https://drive.google.com/')

  const handleCreate = () => {
    if (!title) return
    const id = `a${Date.now()}`
    onCreate({
      id,
      title,
      description: desc,
      dueDate,
      driveLink,
      creatorId,
      submissions: {},
    })
    setTitle('')
    setDesc('')
    setDueDate('')
    setDriveLink('')
    onSuccess()
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 md:p-5">
        <h3 className="font-semibold text-white text-lg flex items-center gap-2">
          <Plus size={22} />
          Create Assignment
        </h3>
      </div>
      <div className="p-4 md:p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter assignment description"
              rows="3"
              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Due Date
            </label>
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Google Drive Link
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="flex-1 border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                />
                {isDriveLinkValid && (
                  <a
                    href={driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 flex items-center gap-1 hover:text-indigo-700 transition-colors px-3 py-2.5 bg-indigo-50 rounded-lg flex-shrink-0"
                  >
                    <BoxArrowUpRight size={16} />
                    <span className="hidden sm:inline text-sm font-medium">Test</span>
                  </a>
                )}
              </div>
              {!isDriveLinkValid && driveLink.length > 0 && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <XCircle size={14} />
                  Drive link must start with "https://drive.google.com/"
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleCreate}
              disabled={!title}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Plus size={18} />
              <span>Create Assignment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Modal
function EditAssignmentModal({ assignment, onSave, onClose }) {
  const [title, setTitle] = useState(assignment.title)
  const [description, setDescription] = useState(assignment.description)
  const [dueDate, setDueDate] = useState(assignment.dueDate)
  const [driveLink, setDriveLink] = useState(assignment.driveLink || '')

  const handleSave = () => {
    onSave(assignment.id, { title, description, dueDate, driveLink })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5 flex justify-between items-center sticky top-0">
          <h3 className="font-semibold text-white text-lg flex items-center gap-2">
            <Pencil size={20} />
            Edit Assignment
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1.5 transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Assignment title"
                className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Assignment description"
                rows="3"
                className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Due Date
              </label>
              <input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
                className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Google Drive Link
              </label>
              <input
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Delete Confirmation Modal
function DeleteConfirmModal({ assignment, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 flex justify-between items-center">
          <h3 className="font-semibold text-white text-lg flex items-center gap-2">
            <Trash size={20} />
            Confirm Deletion
          </h3>
          <button
            onClick={onCancel}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1.5 transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-700 mb-2">
            Are you sure you want to delete the assignment:
          </p>
          <p className="font-semibold text-slate-900 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
            "{assignment.title}"
          </p>
          <p className="text-sm text-slate-600 mb-6">
            This action cannot be undone and all submissions will be lost.
          </p>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(assignment.id)}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Delete Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard
export default function AdminDashboard() {
  const assignments = useSelector((s) => s.assignments.list || [])
  const user = useSelector((s) => s.user.current)
  const dispatch = useDispatch()

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [editItem, setEditItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)

  if (!user || user.role !== 'admin') return null

  const triggerToast = (message, type = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  const handleCreate = (assignment) => {
    dispatch(addAssignment(assignment))
    triggerToast('Assignment created successfully!')
  }

  const handleEdit = (id, updates) => {
    dispatch(editAssignment(id, updates))
    triggerToast('Assignment updated successfully!')
  }

  const handleDelete = (id) => {
    dispatch(deleteAssignment(id))
    setDeleteItem(null)
    triggerToast('Assignment deleted successfully!')
  }

  let totalStudents = 0
  assignments.map((a) => {
                totalStudents = Object.keys(a.submissions || {}).length
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="mb-8 md:mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 mt-2">
                  Create, edit, and monitor assignments
                </p>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 rounded-lg border border-indigo-100">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{assignments.length}</div>
                  <div className="text-xs text-slate-600">Total Assignments</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <NewAssignmentForm
              onCreate={handleCreate}
              creatorId={user.id}
              onSuccess={() => {}}
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            {assignments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-12 text-center">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No assignments yet</h3>
                <p className="text-slate-600 text-sm">Create your first assignment to get started</p>
              </div>
            ) : (
              assignments.map((a) => {
                const submittedCount = Object.keys(a.submissions || {}).length
                const pct = totalStudents ? (submittedCount / totalStudents) * 100 : 0
                return (
                  <div
                    key={a.id}
                    className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-slate-800 mb-2 break-words">
                            {a.title}
                          </h3>
                          {a.description && (
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2 break-words">
                              {a.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-medium">{a.dueDate || 'No due date'}</span>
                            </div>
                            {a.driveLink && (
                              <a
                                href={a.driveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 flex items-center gap-1.5 hover:text-indigo-700 transition-colors font-medium"
                              >
                                <BoxArrowUpRight size={16} />
                                View Drive Link
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2">
                          <div className="flex-1 md:flex-none w-full md:w-auto">
                            <ProgressBar value={pct} />
                            <div className="text-xs text-slate-600 mt-1.5 text-center md:text-right">
                              <span className="font-semibold">{submittedCount}</span> / {totalStudents} submitted
                              <span className="ml-1.5 text-slate-500">({Math.round(pct)}%)</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditItem(a)}
                              className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Edit assignment"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => setDeleteItem(a)}
                              className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete assignment"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {editItem && (
        <EditAssignmentModal
          assignment={editItem}
          onSave={handleEdit}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteItem && (
        <DeleteConfirmModal
          assignment={deleteItem}
          onConfirm={handleDelete}
          onCancel={() => setDeleteItem(null)}
        />
      )}

      <Toast message={toastMessage} visible={showToast} type={toastType} />
    </div>
  )
}