import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    orgname: String,
    address: String,
    phone: String,
    owner: String,
    members: [],
});

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;