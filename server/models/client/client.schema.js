import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
    name: String,
    phone: String,
    registeredDate: Date,
    renewDate: Date,
    daysLeft: Number,
    freezed: {
        type: Boolean,
        required: true,
        default: false
    },
});

mongoose.model('Client', clientSchema);