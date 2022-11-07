import express from 'express';
import { getProjects, getProject, createProject, updateProject } from '../controllers/project.js'

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject)
router.post('/', createProject);
router.patch('/:id', updateProject)

export default router;