import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const createAccount = createAsyncThunk(
    'accounts/createAccounts', 
    async (account) => {
        try {
            const { data } = await api.createAccount(account)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        account: { a:1, b:2 },
        loadingOne: true,
        loadingAll: true,
        loadingDelete: true, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.fulfilled, (store, action) => {          // create an account
                console.log(action.payload)
            })
    },
});
        
export default accountSlice.reducer
        