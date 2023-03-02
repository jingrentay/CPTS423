import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const createAccount = createAsyncThunk(
    'accounts/createAccount', 
    async (account) => {
        try {
            const { data } = await api.createAccount(account)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const authUser = createAsyncThunk(
    'accounts/authuser', 
    async ({account, navigate}) => {
        try {
            const { data } = await api.authUser(account)
            navigate('/projects')
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        account: {},
        loading: true,
    },
    reducers: {
        logout: (state, action) => {
          localStorage.clear();
          state.account = null;
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.fulfilled, (store, action) => {          // create an account
                console.log(action.payload)
            })
            .addCase(authUser.pending, (store, action) => {          // auth and sign in user
                store.loading = true
            })
            .addCase(authUser.fulfilled, (store, action) => {       
                store.loading = false
                store.account = action.payload
                localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            })
            .addCase(authUser.rejected, (store, action) => {        
                console.log(action.payload)
                store.loading = false
            })
    },
});

export const { logout } = accountSlice.actions;
        
export default accountSlice.reducer
        