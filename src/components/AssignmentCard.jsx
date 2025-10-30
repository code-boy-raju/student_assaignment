
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { markSubmitted } from '../components/redux/actions/assignmentActions'
// import ConfirmationModal from './ConfirmationModal'
// import SuccessModal from './SuccessModal'
// import { Link45deg } from 'react-bootstrap-icons'

// export default function AssignmentCard({ assignment, forStudent = true }) {
//   const [confirmOpen, setConfirmOpen] = useState(false)
//   const [successOpen, setSuccessOpen] = useState(false)
//   const user = useSelector((s) => s.user.current)
//   const dispatch = useDispatch()

//   const hasSubmitted = Boolean(user && assignment.submissions && assignment.submissions[user.id])

//   const handleMark = () => {
//     if (!user) return
//     setConfirmOpen(true)
//   }

//   const confirmSubmit = () => {
//     setConfirmOpen(false)
//     if (!user) return
//     dispatch(markSubmitted(assignment.id, user.id))
//     setSuccessOpen(true)
//   }

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-lg font-semibold">{assignment.title}</h3>
//           <p className="text-sm text-slate-600 mt-1">{assignment.description}</p>

//           {assignment.driveLink && (
//             <a
//               href={assignment.driveLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
//             >
//               <Link45deg size={16} /> View Drive Link
//             </a>
//           )}

//           <div className="text-xs text-slate-500 mt-2">Due: {assignment.dueDate}</div>
//         </div>

//         {forStudent ? (
//           <div className="flex flex-col items-end gap-2">
//             <button
//               type="button"
//               onClick={handleMark}
//               disabled={hasSubmitted}
//               className={`px-3 py-1 rounded-md text-sm ${hasSubmitted ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
//             >
//               {hasSubmitted ? 'Submitted' : 'I have submitted'}
//             </button>
//           </div>
//         ) : (
//           <div className="text-sm text-slate-600 mt-2">
//             Submissions: {Object.keys(assignment.submissions || {}).length}
//           </div>
//         )}
//       </div>

//       <ConfirmationModal
//         open={confirmOpen}
//         title={`Confirm submission for "${assignment.title}"`}
//         onCancel={() => setConfirmOpen(false)}
//         onConfirm={confirmSubmit}
//       >
//         <p className="text-sm text-slate-700">
//           Please confirm that you have submitted your assignment externally and want to mark it as submitted.
//         </p>
//       </ConfirmationModal>

//       <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
//     </div>
//   )
// }
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { markSubmitted } from '../components/redux/actions/assignmentActions'
import ConfirmationModal from './ConfirmationModal'
import SuccessModal from './SuccessModal'
import { 
  BoxArrowUpRight, 
  CheckCircleFill, 
  Clock,
  Calendar3,
  FileText
} from 'react-bootstrap-icons'

export default function AssignmentCard({ assignment, forStudent = true }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const user = useSelector((s) => s.user.current)
  const dispatch = useDispatch()

  const hasSubmitted = Boolean(user && assignment.submissions && assignment.submissions[user.id])

  const handleMark = () => {
    if (!user) return
    setConfirmOpen(true)
  }

  const confirmSubmit = () => {
    setConfirmOpen(false)
    if (!user) return
    dispatch(markSubmitted(assignment.id, user.id))
    setSuccessOpen(true)
  }

  // Check if due date is approaching (within 3 days)
  const isDueSoon = () => {
    if (!assignment.dueDate) return false
    const today = new Date()
    const dueDate = new Date(assignment.dueDate)
    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays >= 0
  }

  const isOverdue = () => {
    if (!assignment.dueDate) return false
    const today = new Date()
    const dueDate = new Date(assignment.dueDate)
    return today > dueDate
  }

  return (
    <div className={`bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-xl transition-all duration-300 group ${
      hasSubmitted 
        ? 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50' 
        : isOverdue() && forStudent
        ? 'border-red-200 bg-gradient-to-br from-white to-red-50'
        : isDueSoon() && forStudent
        ? 'border-amber-200 bg-gradient-to-br from-white to-amber-50'
        : 'border-slate-200'
    }`}>
      {/* Status Badge */}
      {forStudent && (
        <div className={`h-1.5 w-full ${
          hasSubmitted 
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
            : isOverdue()
            ? 'bg-gradient-to-r from-red-500 to-red-600'
            : isDueSoon()
            ? 'bg-gradient-to-r from-amber-500 to-amber-600'
            : 'bg-gradient-to-r from-blue-500 to-cyan-600'
        }`} />
      )}

      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title and Status */}
            <div className="flex items-start gap-2 mb-2">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                hasSubmitted 
                  ? 'bg-emerald-100' 
                  : isOverdue() && forStudent
                  ? 'bg-red-100'
                  : isDueSoon() && forStudent
                  ? 'bg-amber-100'
                  : 'bg-blue-100'
              }`}>
                <FileText size={18} className={
                  hasSubmitted 
                    ? 'text-emerald-600' 
                    : isOverdue() && forStudent
                    ? 'text-red-600'
                    : isDueSoon() && forStudent
                    ? 'text-amber-600'
                    : 'text-blue-600'
                } />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-800 break-words">
                  {assignment.title}
                </h3>
                {forStudent && hasSubmitted && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <CheckCircleFill size={14} className="text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      Submitted Successfully
                    </span>
                  </div>
                )}
                {forStudent && !hasSubmitted && isOverdue() && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock size={14} className="text-red-600" />
                    <span className="text-xs font-medium text-red-700">
                      Overdue
                    </span>
                  </div>
                )}
                {forStudent && !hasSubmitted && isDueSoon() && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock size={14} className="text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">
                      Due Soon
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {assignment.description && (
              <p className="text-sm text-slate-600 mb-3 break-words line-clamp-2">
                {assignment.description}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {assignment.dueDate && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar3 size={14} />
                  <span className="font-medium">
                    {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}

              {assignment.driveLink && (
                <a
                  href={assignment.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BoxArrowUpRight size={14} />
                  <span>View Materials</span>
                </a>
              )}

              {!forStudent && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <CheckCircleFill size={14} className="text-emerald-600" />
                  <span className="font-medium">
                    {Object.keys(assignment.submissions || {}).length} submission(s)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          {forStudent && (
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={handleMark}
                disabled={hasSubmitted}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2 whitespace-nowrap ${
                  hasSubmitted
                    ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700'
                }`}
              >
                {hasSubmitted ? (
                  <>
                    <CheckCircleFill size={16} />
                    <span>Submitted</span>
                  </>
                ) : (
                  <>
                    <CheckCircleFill size={16} />
                    <span>Mark as Submitted</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        open={confirmOpen}
        title={`Confirm submission for "${assignment.title}"`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmSubmit}
      >
        <p className="text-sm text-slate-700">
          Please confirm that you have submitted your assignment externally and want to mark it as submitted.
        </p>
      </ConfirmationModal>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  )
}