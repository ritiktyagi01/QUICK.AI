import express from "express"
import { auth } from "../middleware/auth.js";
import { generateArticle } from "../controller/aiController.js";
const airouter = express.Router();
airouter.post('/generate-article',auth,generateArticle);

export default airouter;
