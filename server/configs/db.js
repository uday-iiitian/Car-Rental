import mongoose from 'mongoose'

const connectDB = async()=>{
    try{
        mongoose.connection.on('connected',()=> console.log("Database Connected"));
        await mongoose.connect(`mongodb+srv://udaydhakar:udaydhakar1234@cluster0.1tzfguv.mongodb.net/car-rental`)
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDB;