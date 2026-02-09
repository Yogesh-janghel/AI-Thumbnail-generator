import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'))
        await mongoose.connect(process.env.MONGODB_URI as string);
        
    } catch (error) {

        console.error('MongoDB connection error:', error);
        process.exit(1);

    }
}   

export default connectDB;