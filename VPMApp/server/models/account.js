import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    userID: Number,
    currOrganization: String,
    organizations: [],
    roles: [],
});

const Account = mongoose.model('Account', accountSchema);

export default Account;