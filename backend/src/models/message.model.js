import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: string,
        required: true
    },  // Clerk ID of the sender

    receiverId: {
        type: string,
        required: true
    },

    message : {
        type: String,
        required: true
    },
}, {timestamps: true}); 

export const Message = mongoose.model('Message', messageSchema);