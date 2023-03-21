import axios from 'axios';

// Projects

const url = 'http://localhost:5000/projects'

export const getPlanningProjects = (org) => axios.get(`${url}/inplanning/${org}`)
export const getProgressProjects = (org) => axios.get(`${url}/inprogress/${org}`)
export const getArchivedProjects = (org) => axios.get(`${url}/archived/${org}`)

export const getProject = (id) => axios.get(`${url}/${id}`)
export const createProject = (project) => axios.post(url, project)
export const updateProject = (id, project) => axios.patch(`${url}/${id}`, project)
export const deleteProject = (id) => axios.delete(`${url}/${id}`) 

export const completeTask = (id, project, task, timeDifference, name) => axios.patch(`${url}/task/${id}`, { project, task, timeDifference, name })
export const updateProjectTask = (id, taskList) => axios.patch(`${url}/edit/task/${id}`, taskList)

// Accounts

const accUrl = 'http://localhost:5000/accounts'

export const getOrganization = (orgName) => axios.get(`${accUrl}/${orgName}`)

export const createAccount = (account) => axios.post(accUrl, account)
export const authUser = (account) => axios.post(`${accUrl}/authUser`, account)
export const createOrganization = (newOrg, accountID) => axios.post(`${accUrl}/createOrganization`, {newOrg, accountID})
export const changeOrganization = (email, orgname) => axios.post(`${accUrl}/changeOrganization`, {email, orgname})
