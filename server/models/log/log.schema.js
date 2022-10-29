import mongoose from "mongoose";

const logSchema = mongoose.Schema({
    amount: Number,
    paymentMethod: String,
    date: {
        type: Date,
        default: new Date(),
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
})

mongoose.model('Log', logSchema);
