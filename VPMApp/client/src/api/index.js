import axios from 'axios';

const url = 'http://localhost:5000/projects';

export const getAllProjects = () => axios.get(url);
export const createProject = (project) => axios.post(`${url}/projects`, project)
