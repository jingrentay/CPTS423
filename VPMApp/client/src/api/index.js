import axios from 'axios';

// Projects

const url = 'http://localhost:5000/projects'

export const getPlanningProjects = () => axios.get(`${url}/inplanning`)
export const getProgressProjects = () => axios.get(`${url}/inprogress`)
export const getArchivedProjects = () => axios.get(`${url}/archived`)

export const getProject = (id) => axios.get(`${url}/${id}`)
export const createProject = (project) => axios.post(url, project)
export const updateProject = (id, project) => axios.patch(`${url}/${id}`, project)
export const deleteProject = (id) => axios.delete(`${url}/${id}`) 

export const completeTask = (id, project, task, timeDifference) => axios.patch(`${url}/task/${id}`, { project, task, timeDifference })

// Accounts

const accUrl = 'http://localhost:5000/accounts'

export const createAccount = (account) => axios.post(accUrl, account)
export const authUser = (account) => axios.post(`${accUrl}/authUser`, account)