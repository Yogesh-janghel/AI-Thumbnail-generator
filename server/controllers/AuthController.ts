import { Request, Response } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try{
        const {name, email, password} =req.body;

        //find user by email
        const user =await User.findOne({email});
        if(user){
            return res.status(400).json({message:'User already exists with this email'});
        }

        //Encrypt password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);

        //Create new user
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });
        await newUser.save();

        //Set session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        return res.json({message:'User registered successfully',user:{
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email
        }});

    } catch(error){
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

//Login controller
export const loginUser = async (req: Request, res: Response) =>{
    try{
        const {email, password} =req.body;

        //find user by email
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});
        }

        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid email or password'});
        }

        //Set session
        req.session.isLoggedIn = true;
        req.session.userId = user._id;

        return res.json({message:'User logged in successfully',user:{
            _id:user._id,
            name:user.name,
            email:user.email
        }});

    } catch(error){
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
}

//logout controller
export const logoutUser = (req: Request, res: Response) =>{
    req.session.destroy((err) => {
            if(err){
                console.error('Logout error:', err);
                return res.status(500).json({message:'Error during logout'});
            }
            return res.json({message:'User logged out successfully'});
    });
}

//Controller for user verify
export const verifyUser = async (req: Request, res: Response) =>{
    try{
        const {userId} = req.session;
        const user = await User.findById(userId).select('-password');

        if(!user){
                return res.status(401).json({message:'Unauthorized'});
        }   
        return res.json({message:'User verified successfully',user});
    } catch(error){
        console.error('Verify user error:', error);
        res.status(500).json({ message: 'Server error during user verification' });
    }
}