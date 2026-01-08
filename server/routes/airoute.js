import express from "express"
import { auth } from "../middleware/auth.js";
import { generateArticle, generateBlogTitle, generateImage, humanizeText, removeImageBackground, removeImageobject } from "../controller/aiController.js";
import { upload } from "../config/multer.js";
import rateLimit from "express-rate-limit";

const resumeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2
});
const airouter = express.Router();
airouter.post('/generate-article', auth, generateArticle);
airouter.post('/generate-blog-title', auth, generateBlogTitle);
airouter.post('/generate-image', auth, generateImage);
airouter.post('/remove-image-background', auth, upload.single('image'), removeImageBackground);
airouter.post('/remove-image-object', auth, upload.single('image'), removeImageobject);
airouter.post('/humanize-text', auth, humanizeText);

export default airouter;
