export const loadState = () => {
  try {
    const serialized = localStorage.getItem('assignment_app_state')
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem('assignment_app_state', serialized)
  } catch (err) {
  }
}