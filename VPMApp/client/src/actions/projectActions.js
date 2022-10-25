import * as api from '../api'

// Redux Action to get all projects
export const getProjects = () => async (dispatch) => {
    try {
        const { data } = await api.getAllProjects();
        dispatch({ type: 'GET_ALL_PROJECTS', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

// Action to create and post a project
export const createProject = (project) => async (dispatch) => {
    try {
        const { data } = await api.createProject(project)
        console.log(data)
        dispatch({ type: 'CREATE_PROJECT', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}