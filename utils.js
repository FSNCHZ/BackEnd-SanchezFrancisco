import { dirname } from "path"
import { fileURLToPath } from "url"
import multer from "multer"

//dirname

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//multer

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+'public/img')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const uploader = multer({storage})
export default __dirname