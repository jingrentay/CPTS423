import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const getProjects = createAsyncThunk(
    'projects/getProjects', 
    async () => {
        try {
            const { data } = await api.getAllProjects();
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const getProject = createAsyncThunk(
    'projects/getProject', 
    async (id) => {
        try {
            const { data } = await api.fetchProject(id);
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const createProject = createAsyncThunk(
    'projects/createProject', 
    async (project) => {
        try {
            const { data } = await api.createProject(project)
            console.log(data)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const updateProject = createAsyncThunk(
    'projects/updateProject', 
    async (project) => {
        try {
            console.log(project)
            const { data } = await api.updateProject(project.projectID, project)
            console.log(data)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject', 
    async (project) => {
        try {
            console.log(project)
            const { data } = await api.deleteProject(project.projectID, project)
            console.log(data)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        project: {},
        loadingOne: true,
        loadingAll: true,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (store, action) => {
                store.loadingAll = true
            })
            .addCase(getProjects.fulfilled, (store, action) => {
                store.loadingAll = false
                store.projects = action.payload
            })
            .addCase(getProjects.rejected, (store, action) => {
                store.loadingAll = false
            })
            .addCase(getProject.pending, (store, action) => {
                store.loadingOne = true
            })
            .addCase(getProject.fulfilled, (store, action) => {
                store.loadingOne = false
                store.project = action.payload
            })
            .addCase(getProject.rejected, (store, action) => {
                store.loadingOne = false
            })
            .addCase(createProject.fulfilled, (store, action) => {
                console.log(action.payload)
            })
            .addCase(updateProject.fulfilled, (store, action) => {
                console.log(action.payload)
            })
            .addCase(deleteProject.fulfilled, (store, action) => {
                console.log(action.payload)
            })
    },
});

export default projectSlice.reducer
