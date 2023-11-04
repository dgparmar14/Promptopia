import mongoose from "mongoose";

let isConnected = false;// track connection

export const connectToDB =  async()=>{
    // always recomanded
    mongoose.set("strictQuery", true);

    if(isConnected){
        console.log("mongo is already connected");
        return ;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"Share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        isConnected= true;
    } catch (error) {
        console.log("Idhar util me error he",error);
    }
}