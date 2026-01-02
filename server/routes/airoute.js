import express from "express"
import { auth } from "../middleware/auth.js";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageobject, reviewresume } from "../controller/aiController.js";
import { upload } from "../config/multer.js";

const airouter = express.Router();
airouter.post('/generate-article',auth,generateArticle);
airouter.post('/generate-blog-title',auth,generateBlogTitle);
airouter.post('/generate-image',auth,generateImage);
airouter.post('/remove-image-background',upload.single('image'),auth,removeImageBackground);
airouter.post('/remove-image-object',upload.single('image'),auth,removeImageobject);
airouter.post('/review-resume',upload.single('resume'),auth,reviewresume);

export default airouter;
