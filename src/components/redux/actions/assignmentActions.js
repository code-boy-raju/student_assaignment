export const LOAD_ASSIGNMENTS = 'LOAD_ASSIGNMENTS'
export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'
export const EDIT_ASSIGNMENT = 'EDIT_ASSIGNMENT'
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'
export const MARK_SUBMITTED = 'MARK_SUBMITTED'

export const loadAssignments = (assignments) => ({
  type: LOAD_ASSIGNMENTS,
  payload: assignments,
})

export const addAssignment = (assignment) => ({
  type: ADD_ASSIGNMENT,
  payload: assignment,
})

export const editAssignment = (id, updates) => ({
  type: EDIT_ASSIGNMENT,
  payload: { id, updates },
})

export const deleteAssignment = (id) => ({
  type: DELETE_ASSIGNMENT,
  payload: id,
})

export const markSubmitted = (assignmentId, studentId) => ({
  type: MARK_SUBMITTED,
  payload: { assignmentId, studentId },
})
