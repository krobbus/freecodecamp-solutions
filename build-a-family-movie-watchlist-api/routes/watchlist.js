import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModification } from '../middleware/authorize.js';
import {
    getWatchlist,
    addMovie,
    updateMovie,
    deleteMovie
} from '../utils/db.js';

const router = express.Router();

router.use(authenticate);

router.get('/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const watchlist = getWatchlist(userId);

        if (watchlist === null) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(watchlist);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:userId/movies', authorizeModification, (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const movieData = req.body || {};

        const newMovie = addMovie(userId, movieData);
        if (!newMovie) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(201).json(newMovie);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:userId/movies/:movieId', authorizeModification, (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const movieId = Number(req.params.movieId);
        const updates = req.body || {};

        const updatedMovie = updateMovie(userId, movieId, updates);
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie or user not found' });
        }

        return res.status(200).json(updatedMovie);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const movieId = Number(req.params.movieId);

        const success = deleteMovie(userId, movieId);
        if (!success) {
            return res.status(404).json({ error: 'Movie or user not found' });
        }

        return res.status(200).json({ message: 'Movie removed successfully.' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;