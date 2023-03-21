import mongoose from 'mongoose';
import Account from '../models/account.js';
import Organization from '../models/organization.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Create an account
export const createAccount = async (req, res) => {
    const account = req.body
    try {
        // check if account exists
        const existingAccount = await Account.findOne({ email: account.email })
        if (existingAccount) return res.status(404).json({ message: 'Account already exists.' })
        // encrypt password (hash)
        const hash = await bcrypt.hash(account.password, 12) // salt = 12
        const result = await Account.create({...account, password: hash})
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Authenticate and sign in user
export const authUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // check if account exists
        const existingAccount = await Account.findOne({ email: email })
        if (!existingAccount) return res.status(404).json({ message: 'No account found.' })
        // check if the password is correct
        const isMatch = await bcrypt.compare(password, existingAccount.password)
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password.'})
        // Password correct - send json web token to frontend
        const token = jwt.sign({ email: existingAccount.email, id: existingAccount._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result: existingAccount, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create an organization
export const createOrganization = async (req, res) => {
    const {newOrg, accountID} = req.body
    try {
        // check if organization exists
        const existingOrg = await Organization.findOne({ orgname: newOrg.orgname })
        if (existingOrg) return res.status(404).json({ message: 'Organization already exists.' })
        // create organization in database
        const result = await Organization.create(newOrg)
        // add organization to list of accounts that the account is a part of
        const result2 = await Account.findOneAndUpdate({ _id: accountID }, { organizations: [ newOrg.orgname ] })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Change current organization for account
export const changeOrganization = async (req, res) => {
    const { email, orgname } = req.body
    try {
        // check if account exists
        const existingAccount = await Account.findOne({ email: email })
        if (!existingAccount) return res.status(404).json({ message: 'No account found.' })
        const result = await Account.findOneAndUpdate({ email: email }, { currOrganization: orgname })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get an organization
export const getOrganization = async (req, res) => {
    const { orgName } = req.params
    console.log(orgName)
    try {
        const organization = await Organization.findOne({ orgname: orgName })
        res.status(200).json(organization)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}