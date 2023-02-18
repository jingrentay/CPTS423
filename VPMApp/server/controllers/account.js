import mongoose from 'mongoose';
import Account from '../models/account.js';

// Create an account
export const createAccount = async (req, res) => {
    const account = req.body
    const newAccount = new Account(account)
    try {
        await newAccount.save()
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}