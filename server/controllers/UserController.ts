import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
//Controller to get all user thumbnails

export const getUserThumbnails = async (req: Request, res: Response) => {
    try{
       const {userId} = req.session; 
       const thumbnails = await Thumbnail.find({userId}).sort({createdAt: -1});

       res.json({thumbnails});
    }
    catch(error: any){
        res.status(500).json({ message: 'Server Error', error });
    }
}

//controller to get single thumbnail by id
export const getThumbnailById = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {userId} = req.session; 
        const thumbnail = await Thumbnail.findOne({_id: id, userId});

        res.status(200).json({thumbnail});
    }
    catch(error: any){
        res.status(500).json({ message: 'Server Error', error });
    }
}