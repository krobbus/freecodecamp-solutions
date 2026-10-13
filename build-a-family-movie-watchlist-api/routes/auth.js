import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findByUsername } from '../utils/db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const user = findByUsername(username);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const hash = user.passwordHash || user._password;
        let isPasswordValid = false;

        if (hash) {
            if (hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$')) {
                isPasswordValid = await bcrypt.compare(password, hash);
            } else {
                isPasswordValid = (password === hash);
            }
        }

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;