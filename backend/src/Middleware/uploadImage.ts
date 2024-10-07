import path from "path";
import multer from "multer"
import fs from "fs"



// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, 'src/Assets/'); // Save files in the 'src/Assets/' directory
      const uploadPath = 'src/Assets/';
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Append the original file extension
    },
  });
  
  export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 * 1024 }, // 1GB
    })