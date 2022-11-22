import axios from 'axios';

const url = 'http://localhost:5000/projects';
const url1 = 'http://localhost:5000/projects/view';

export const getAllProjects = () => axios.get(url);
export const fetchProject = (id) => axios.get(`${url}/${id}`)
export const createProject = (project) => axios.post(url, project)
export const updateProject = (id,project) => axios.patch(`${url}/${id}`,project)
export const deleteProject = (id,project) => axios.delete(`${url}/${id}`, project)