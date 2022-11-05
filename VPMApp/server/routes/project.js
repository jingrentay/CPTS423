import express from 'express';
import { getProjects, getProject, createProject } from '../controllers/project.js'

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject)
router.post('/', createProject);

export default router;