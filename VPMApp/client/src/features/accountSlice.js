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

export const getOrganization = createAsyncThunk(
    'accounts/getOrganization', 
    async (orgName) => {
        try {
            const { data } = await api.getOrganization(orgName)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const createOrganization = createAsyncThunk(
    'accounts/createOrganization', 
    async ({newOrg, accountID}) => {
        try {
            const { data } = await api.createOrganization(newOrg, accountID)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const changeOrganization = createAsyncThunk(
    'accounts/changeOrganization', 
    async ({email, orgname}) => {
        try {
            const { data } = await api.changeOrganization(email, orgname)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const editRole = createAsyncThunk(
    'accounts/editRole', 
    async ({id, newrole, orgname}) => {
        try {
            const { data } = await api.editRole(id, newrole, orgname)
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
        organization: {},
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
            .addCase(createOrganization.fulfilled, (store, action) => {          // create an organization 
                console.log(action.payload)
            })
            .addCase(changeOrganization.fulfilled, (store, action) => {          // change an organization 
                console.log(action.payload)
            })
            .addCase(getOrganization.pending, (store, action) => {          // get an organization
                store.loading = true
            })
            .addCase(getOrganization.fulfilled, (store, action) => {       
                store.loading = false
                store.organization = action.payload
            })
            .addCase(getOrganization.rejected, (store, action) => {    
                store.loading = false
            })
            .addCase(editRole.pending, (store, action) => {          // change a role
                store.loading = true
            })
            .addCase(editRole.fulfilled, (store, action) => {       
                store.loading = false
                store.organization = action.payload
            })
            .addCase(editRole.rejected, (store, action) => {    
                store.loading = false
            })
    },
});

export const { logout } = accountSlice.actions;
        
export default accountSlice.reducer
        