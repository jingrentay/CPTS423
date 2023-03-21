import express from 'express';
import { createAccount, authUser, createOrganization, changeOrganization, getOrganization } from '../controllers/account.js'

const router = express.Router();

router.get('/:orgName', getOrganization);

router.post('/', createAccount);
router.post('/authuser', authUser);
router.post('/createOrganization', createOrganization);
router.post('/changeOrganization', changeOrganization);

export default router;