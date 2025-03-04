import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products"
const schema = new Schema({
    title: { type: String, required: true, index: true }, //index: true nos indexa las propiedades, mejorando la eficacia de mongo
    category: { type: String, index: true, default: "products" },
    description: { type: String, index: true, default: "Product description" },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
    img: { type: String, default: "https://cdn-icons-png.flaticon.com/512/9402/9402212.png" }
}, { timestamps: true })

schema.plugin(mongoosePaginate)

const Product = model(collection, schema)
export default Product