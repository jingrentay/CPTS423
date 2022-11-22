import express from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/project.js'

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject)
router.post('/', createProject);
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)

export default router;