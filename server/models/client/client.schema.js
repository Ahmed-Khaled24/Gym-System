import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
    name: String,
    phone: String,
    registrationDate: Date,
    renewalDate: Date,
    daysLeft: Number,
    freezed: {
        type: Boolean,
        default: false
    },
});

mongoose.model('Client', clientSchema);