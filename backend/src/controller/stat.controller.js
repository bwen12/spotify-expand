import { Song } from '../models/song.model.js'; 
import { User } from '../models/user.model.js'; 
import { Album } from '../models/album.model.js';

export const getStats = async (req, res, next) => {
    try {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtistsResult] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),
            Song.aggregate([
                {
                    $unionWith: {
                        coll: 'albums',
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: '$artist'
                    }
                },
                {
                    $count: 'uniqueArtists'
                }
            ])
        ]);

        const uniqueArtists = uniqueArtistsResult[0]?.uniqueArtists || 0;

        res.status(200).json({
            totalSongs,
            totalAlbums,
            totalUsers,
            uniqueArtists
        });
    } catch (error) {
        next(error);
    }
};
