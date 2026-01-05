import express from "express"
import { auth } from "../middleware/auth.js";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageobject, reviewresume } from "../controller/aiController.js";
import { upload } from "../config/multer.js";

const airouter = express.Router();
airouter.post('/generate-article',auth,generateArticle);
airouter.post('/generate-blog-title',auth,generateBlogTitle);
airouter.post('/generate-image',auth,generateImage);
airouter.post('/remove-image-background',auth,upload.single('image'),removeImageBackground);
airouter.post('/remove-image-object',auth,upload.single('image'),removeImageobject);
airouter.post('/review-resume',auth,upload.single('resume'),reviewresume);

export default airouter;
