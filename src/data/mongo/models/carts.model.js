import { Schema, Types, model } from "mongoose";

const collection = "carts"

const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required: true, index: true },
    product_id: { type: Types.ObjectId, ref: "products", required: true, index: true},
    quantity: { type: Number, default: 1},
    state: {type: String, default: "reserved", enum: ["reserved", "paid", "delivered"], index: true}
}, { timestamps: true })

//Definimos el middleware pre

schema.pre(
    "/^find/", function () {
        this.populate("user_id", "email avatar").populate("product_id", "title img price")
    }
)

const Cart = model(collection, schema)
export default Cart