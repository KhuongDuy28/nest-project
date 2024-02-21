import { diskStorage } from "multer";

export const storageConfig = (folder: string) => diskStorage({
    destination: `storage/${folder}`,
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
})