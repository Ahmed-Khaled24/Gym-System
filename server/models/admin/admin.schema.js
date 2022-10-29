import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    name: String,
    loginId: String,
    password: String,
    registeredDate: Date, 
    active: {
        type: Boolean,
        default: true,
    }
})

mongoose.model('Admin', adminSchema);