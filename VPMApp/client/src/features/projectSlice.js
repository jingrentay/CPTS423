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

export const getPlanningProjects = createAsyncThunk(
    'projects/getPlanningProjects', 
    async () => {
        try {
            const { data } = await api.getPlanningProjects();
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const getProgressProjects = createAsyncThunk(
    'projects/getProgressProjects', 
    async () => {
        try {
            const { data } = await api.getProgressProjects();
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const getArchivedProjects = createAsyncThunk(
    'projects/getArchivedProjects', 
    async () => {
        try {
            const { data } = await api.getArchivedProjects();
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
    async (id) => {
        try {
            const { data } = await api.deleteProject(id)
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
        loadingDelete: true, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (store, action) => {              // get all projects
                store.loadingAll = true
            })
            .addCase(getProjects.fulfilled, (store, action) => {
                store.loadingAll = false
                store.projects = action.payload
            })
            .addCase(getProjects.rejected, (store, action) => {
                store.loadingAll = false
            })
            .addCase(getPlanningProjects.pending, (store, action) => {      // get "in planning" projects
                store.loadingAll = true
            })
            .addCase(getPlanningProjects.fulfilled, (store, action) => {
                store.loadingAll = false
                store.projects = action.payload
            })
            .addCase(getPlanningProjects.rejected, (store, action) => {
                store.loadingAll = false
            })
            .addCase(getProgressProjects.pending, (store, action) => {      // get "in progress" projects
                store.loadingAll = true
            })
            .addCase(getProgressProjects.fulfilled, (store, action) => {
                store.loadingAll = false
                store.projects = action.payload
            })
            .addCase(getProgressProjects.rejected, (store, action) => {
                store.loadingAll = false
            })
            .addCase(getArchivedProjects.pending, (store, action) => {      // get archived projects
                store.loadingAll = true
            })
            .addCase(getArchivedProjects.fulfilled, (store, action) => {
                store.loadingAll = false
                store.projects = action.payload
            })
            .addCase(getArchivedProjects.rejected, (store, action) => {
                store.loadingAll = false
            })
            .addCase(getProject.pending, (store, action) => {               // get one project
                store.loadingOne = true
            })
            .addCase(getProject.fulfilled, (store, action) => {
                store.loadingOne = false
                store.project = action.payload
            })
            .addCase(getProject.rejected, (store, action) => {
                store.loadingOne = false
            })
            .addCase(createProject.fulfilled, (store, action) => {          // create a project
                console.log(action.payload)
            })
            .addCase(updateProject.fulfilled, (store, action) => {          // update a project
                console.log(action.payload)
            })
            .addCase(deleteProject.pending, (store, action) => {            // delete a project
                store.loadingAll = true
            })
            .addCase(deleteProject.fulfilled, (store, action) => {          // delete a project
                store.loadingAll = false
                const id = action.meta.arg
                console.log(id)
                if (id) {
                    store.projects = store.projects.filter((project) => project._id !== id)
                }
            })
            .addCase(deleteProject.rejected, (store, action) => {
                store.loadingAll = false
            })
    },
});

export default projectSlice.reducer
