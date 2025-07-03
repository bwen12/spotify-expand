import mongoose from 'mongoose';
const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageURL: { type: String, required: true },
    releaseYear: { type: Date, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // Array of song IDs shown by the [] thing around the {}
}, { timestamps: true });


export const Album = mongoose.model('Album', albumSchema);
