import { legacy_createStore, applyMiddleware, combineReducers } from 'redux'
import {thunk} from 'redux-thunk'
import assignmentReducer from './reducers/assignmentReducer'
import userReducer from './reducers/userReducer'
import { loadState, saveState } from '../../utils/localStorage'
import { compose } from 'redux'
const rootReducer = combineReducers({
  assignments: assignmentReducer,
  user: userReducer,
})
const composer=compose(applyMiddleware(thunk))
const persisted = loadState()

const store = legacy_createStore(rootReducer, persisted || undefined, composer)

let saveTimer = null
store.subscribe(() => {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    const state = store.getState()
    saveState({ assignments: state.assignments, user: state.user })
  }, 250)
})

export default store