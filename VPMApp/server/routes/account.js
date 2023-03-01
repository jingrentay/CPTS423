import express from 'express';
import { createAccount, authUser } from '../controllers/account.js'

const router = express.Router();

router.post('/', createAccount);
router.post('/authuser', authUser);

export default router;