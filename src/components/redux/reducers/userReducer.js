import { LOGIN_USER, LOGOUT_USER } from '../actions/userActions'

const initialState = { current: null }

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, current: action.payload }
    case LOGOUT_USER:
      return { ...state, current: null }
    default:
      return state
  }
}