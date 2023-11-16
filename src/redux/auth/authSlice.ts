import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthInitState } from './authModel'

const initialState: AuthInitState = {
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state: AuthInitState, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },
    // extraReducers: builder => {},
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions

export const { setLoading } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
