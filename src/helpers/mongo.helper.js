import { connect } from "mongoose";

async function connectMongo(link) {
    try {
        await connect(link)
        console.log("db connected");
    } catch (error) {
        throw error
    }
}

export default connectMongo