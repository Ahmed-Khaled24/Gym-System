import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
    name: String,
    registeredDate: Date,
    renewDate: Date,
    daysLeft: Number,
    freezed: {
        type: Boolean,
        required: true,
        default: false
    },
});

mongoose.model('clients', clientSchema);