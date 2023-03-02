import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

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
            return { projects: data.projects, taskList: data.taskList };
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
            const { data } = await api.getProject(id);
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

export const completeTask = createAsyncThunk(
    'projects/completeTask', 
    async ({project, task, timeDifference}) => {
        try {
            console.log(project, task, timeDifference)
            const { data } = await api.completeTask(project.projectID, project, task, timeDifference)
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

export const updateProjectTask = createAsyncThunk(
    'projects/updateProjectTask',
    async ({project, taskList}) => {
        try{
            const {data} = await api.updateProjectTask(project.projectID, taskList)
            console.log(data);
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
        taskList: [],
    },
    extraReducers: (builder) => {
        builder
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
                store.projects = action.payload.projects
                store.taskList = action.payload.taskList
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
            .addCase(deleteProject.fulfilled, (store, action) => {         
                store.loadingAll = false
                const id = action.meta.arg
                console.log(id)
                if (id) {
                    // remove deleted project
                    store.projects = store.projects.filter((project) => project._id !== id)
                    if (store.taskList) {
                        store.taskList = store.taskList.filter((task) => task._id !== id)
                    }
                }
            })
            .addCase(deleteProject.rejected, (store, action) => {
                store.loadingAll = false
            })
            .addCase(updateProjectTask.fulfilled , (store,action) => {
                console.log(action.payload)
            })
    },
});

export default projectSlice.reducer
