import axios from 'axios';

const url = 'http://localhost:5000/projects'

export const getAllProjects = () => axios.get(url)
export const getPlanningProjects = () => axios.get(`${url}/inplanning`)
export const getProgressProjects = () => axios.get(`${url}/inprogress`)
export const getArchivedProjects = () => axios.get(`${url}/archived`)

export const fetchProject = (id) => axios.get(`${url}/${id}`)
export const createProject = (project) => axios.post(url, project)
export const updateProject = (id, project) => axios.patch(`${url}/${id}`, project)
export const deleteProject = (id) => axios.delete(`${url}/${id}`) 

export const completeTask = (id, project, task, timeDifference) => axios.patch(`${url}/task/${id}`, { project, task, timeDifference })