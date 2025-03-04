import { Schema, model } from "mongoose"

const collection = "users"

const schema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "VIP"], index: true },
    avatar: { type: String, default: "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"}
}, { timestamps: true })

const User = model(collection, schema)
export default User