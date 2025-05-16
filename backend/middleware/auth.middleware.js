import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export const authUser = async (req, res, next) => {
    try {
        console.log('Request headers:', req.headers);
        console.log('Request cookies:', req.cookies || 'No cookies');

        const authHeader = req.headers.authorization;
        const token = (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null)
            || (req.cookies ? req.cookies.token : null);

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'Unauthorized User: No token provided' });
        }

        const isBlacklisted = await redisClient.get(token);
        if (isBlacklisted) {
            console.log('Token is blacklisted:', token);
            if (req.cookies?.token) {
                res.cookie('token', '', { expires: new Date(0) });
            }
            return res.status(401).json({ message: 'Unauthorized User: Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized User: Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized User: Invalid token' });
        }
        return res.status(401).json({ message: 'Unauthorized User: Authentication failed', error: error.message });
    }
};