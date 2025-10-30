import {
  LOAD_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  EDIT_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  MARK_SUBMITTED,
} from '../actions/assignmentActions'

const savedAssignments = JSON.parse(localStorage.getItem('assignments')) || []

const initialState = {
  list: savedAssignments,
}

export default function assignmentReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case LOAD_ASSIGNMENTS:
      newState = {
        ...state,
        list: Array.isArray(action.payload) ? action.payload : state.list,
      }
      break

    case ADD_ASSIGNMENT:
      newState = {
        ...state,
        list: [action.payload, ...state.list],
      }
      break

    case EDIT_ASSIGNMENT:
      newState = {
        ...state,
        list: state.list.map((a) =>
          a.id === action.payload.id
            ? { ...a, ...action.payload.updates }
            : a
        ),
      }
      break

    case DELETE_ASSIGNMENT:
      newState = {
        ...state,
        list: state.list.filter((a) => a.id !== action.payload),
      }
      break

    case MARK_SUBMITTED:
      newState = {
        ...state,
        list: state.list.map((a) => {
          if (a.id !== action.payload.assignmentId) return a
          const submissions = { ...(a.submissions || {}) }
          submissions[action.payload.studentId] = true
          return { ...a, submissions }
        }),
      }
      break

    default:
      return state
  }

  // Persist to localStorage every time state updates
  localStorage.setItem('assignments', JSON.stringify(newState.list))
  return newState
}
