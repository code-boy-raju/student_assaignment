
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import AssignmentCard from '../AssignmentCard'
import ProgressBar from '../ProgressBar'

export default function StudentDashboard() {
  const assignments = useSelector((s) => s.assignments.list || [])
  const user = useSelector((s) => s.user.current)

  if (!user) return null

  const myAssignments = useMemo(() => assignments, [assignments])

  const submittedCount = myAssignments.filter((a) => a.submissions && a.submissions[user.id]).length
  const pendingCount = myAssignments.length - submittedCount
  const progress = myAssignments.length ? (submittedCount / myAssignments.length) * 100 : 0

  // Separate submitted and pending assignments
  const { submitted, pending } = useMemo(() => {
    const submitted = myAssignments.filter((a) => a.submissions && a.submissions[user.id])
    const pending = myAssignments.filter((a) => !a.submissions || !a.submissions[user.id])
    return { submitted, pending }
  }, [myAssignments, user.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header Section */}
        <div className="mb-8 md:mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-slate-100">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Your Assignments
                  </h1>
                  <p className="text-slate-600 mt-2">
                    Track and confirm your submissions
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 rounded-lg border border-blue-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{submittedCount}/{myAssignments.length}</div>
                    <div className="text-xs text-slate-600">Completed</div>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">Overall Progress</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {submittedCount} submitted, {pendingCount} pending
                    </p>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {Math.round(progress)}%
                  </div>
                </div>
                <ProgressBar value={progress} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{myAssignments.length}</div>
                <div className="text-sm text-slate-600">Total Assignments</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{submittedCount}</div>
                <div className="text-sm text-slate-600">Submitted</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{pendingCount}</div>
                <div className="text-sm text-slate-600">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Assignments Section */}
        {myAssignments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-12 text-center">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No assignments yet</h3>
            <p className="text-slate-600 text-sm">Check back later for new assignments</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Assignments */}
            {pending.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Pending Assignments
                    <span className="ml-2 text-sm font-normal text-slate-600">({pending.length})</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pending.map((a) => (
                    <AssignmentCard key={a.id} assignment={a} forStudent />
                  ))}
                </div>
              </div>
            )}

            {/* Submitted Assignments */}
            {submitted.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Submitted Assignments
                    <span className="ml-2 text-sm font-normal text-slate-600">({submitted.length})</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {submitted.map((a) => (
                    <AssignmentCard key={a.id} assignment={a} forStudent />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}