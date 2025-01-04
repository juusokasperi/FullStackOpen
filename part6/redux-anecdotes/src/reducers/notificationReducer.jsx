import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange(state, action) {
            return action.payload
        },
        clearNotification(state) {
            return ''
        }
    }
})

export const setNotification = (content, timeout) => {
    return async dispatch => {
        const time = timeout * 1000
        dispatch(notificationChange(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time)
    }}

export const { notificationChange, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer