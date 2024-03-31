import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        const connect= mongoose.connection;
        connect.on('connected', ()=>{
            console.log("MongoDB connected");
            
        })
        connect.on('error', (err)=>{
            console.log("MongoDB connection error, please make sure DB is up and running "+ err);
            process.exit()
            
        })
    } catch (error) {
        console.log("something went wrong: ", error);
        
    }
}

//the exclamation at the end indicates to typescript that the user is sure that the MONGODB_URL is string
//since TS requre type declaration, you can avoid it using exclamation if you are sure of the type of the variable