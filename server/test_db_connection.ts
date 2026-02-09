import dotenv from 'dotenv';
import mongoose from 'mongoose';

const result = dotenv.config();
console.log("Dotenv parsed:", result.parsed);
console.log("Environment URI:", process.env.MONGODB_URI);

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("No MONGODB_URI found");
        process.exit(1);
    }
    
    // Check if it's the old SRV one
    if (process.env.MONGODB_URI.includes("mongodb+srv")) {
         console.warn("WARNING: Still using mongodb+srv URI which is known to fail DNS lookup.");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB connected successfully');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('MongoDB connection error details:', error);
        process.exit(1);
    }
}

connectDB();