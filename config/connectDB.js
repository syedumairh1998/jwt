import mongoose from "mongoose";


const connectDB = async (url) => {
    try{
        const option = {
            dbName:'geekShop'
        }
        await mongoose.connect(url,option)
        console.log('Connection successful')

    }
    catch(error){
        console.log('Error occurred : ',error)
    }
}

export default connectDB