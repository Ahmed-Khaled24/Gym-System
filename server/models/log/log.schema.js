import mongoose from "mongoose";

const logSchema = mongoose.Schema({
    amount: Number, // money in egp
    durationInMonths: Number,
    type: String, // new subscription or renew subscription
    paymentMethod: String,
    date: {
        type: Date,
        default: new Date(),
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
})

mongoose.model('Log', logSchema);
