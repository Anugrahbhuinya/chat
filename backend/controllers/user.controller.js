import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';



export const createUser = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT()
        return res.status(201).json({ user, token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    

}

export const loginUser = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = await user.generateJWT();
        return res.status(200).json({ user, token });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const getUserProfile = async(req,res)=>{
    console.log(req.user);
    res.status(200).json({ user: req.user });
}

export const logoutUser = async (req, res) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        redisClient.setex(token, "logout", "EX", 60*60*24*7);

        res.status(200).json({ message: "Logout successful" });

    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
}

export const getAllUsers = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });

        return res.status(200).json({
            users: allUsers
        })

    } catch (err) {

        console.log(err)

        res.status(400).json({ error: err.message })

    }
}
