import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import FormData from "form-data";
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";


import { createRequire } from "module";

// import { GoogleGenerativeAI } from "@google/generative-ai";


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

//For Article Generator 

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;
        console.log(plan, free_usage, userId, prompt, length);

        // if (!prompt) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Prompt is required"
        //     });
        // }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({
                success: false,
                message: "You have reached your free usage limit. Upgrade to Premium."
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length
        });
        //    console.log("API Response:", JSON.stringify(response, null, 2));


        const content = response.choices[0].message.content;
        //This line extracts the AI-generated text from the API response and stores it in content.

        await sql`
            INSERT INTO creations (user_id, content, prompt, type)
            VALUES (${userId}, ${content}, ${prompt}, 'article')
        `;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }
        // console.log("Generated Content:", content);
        res.json({ success: true, content });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//For Blog Title Generator

export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt  is required"
            });
        }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({
                success: false,
                message: "You have reached your free usage limit. Upgrade to Premium."
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 5000
        });

        const content = response.choices[0].message.content;
        //This line extracts the AI-generated text from the API response and stores it in content.

        await sql`
            INSERT INTO creations (user_id, content, prompt, type)
            VALUES (${userId}, ${content}, ${prompt}, 'blog-title')
        `;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        res.json({ success: true, content });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//for Image generator

export const auth = async (req, res, next) => {
    try {
        // Clerk injects req.auth as a FUNCTION
        const authData = await req.auth();

        const { userId, has } = authData;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Check subscription
        const hasPremiumPlan = await has({ plan: "premium" });

        // Fetch user
        const user = await clerkClient.users.getUser(userId);

        // Attach clean data to req
        req.auth = { userId };
        req.plan = hasPremiumPlan ? "premium" : "free";
        req.free_usage = user.privateMetadata?.free_usage || 0;

        next();
    } catch (error) {
        console.error("AUTH ERROR:", error.message);
        res.status(401).json({
            success: false,
            message: "Authentication failed",
        });
    }
};


export const generateImage = async (req, res) => {
    try {
        console.log("STEP 1: auth object =", req.auth);
        console.log("STEP 2: body =", req.body);
        console.log("STEP 3: plan =", req.plan);

        const { userId } = req.auth(); // FIX 1
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (!prompt) { // FIX 2
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (plan.toString() !== "premium") {
            return res.json({
                success: false,
                message:
                    "This feature is only available for Premium subscription. Upgrade to continue.",
            });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer",
            }
        );
        console.log("IMAGE DATA RECEIVED", data);

        const base64Image = `data:image/png;base64,${Buffer.from(
            data
        ).toString("base64")}`;

        const { secure_url } = await cloudinary.uploader.upload(base64Image);

        await sql`
      INSERT INTO creations (user_id, content, prompt, type, publish)
      VALUES (${userId}, ${secure_url}, ${prompt}, 'image', ${publish ?? false}) `;

        res.json({ success: true, content: secure_url });
    } catch (error) {
        console.error("IMAGE ERROR:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//for remove background from image

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available for Premium subscription. To continue upgrade to Premium Plan."
            });
        }


        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [{
                effect: 'background_removal',
                background_removal: 'remove_the_background'
            }]
        });

        await sql`
            INSERT INTO creations (user_id, content, prompt, type)
            VALUES (${userId}, ${secure_url},'Remove the background from image', 'image')`;

        res.json({ success: true, content: secure_url });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//for remove object from image

export const removeImageobject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;
        const { object } = req.body;
        const plan = req.plan;


        if (!object) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available for Premium subscription. To continue upgrade to Premium Plan."
            });
        }


        const { public_id } = await cloudinary.uploader.upload(image.path);
        const imageUrl = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_image:${object}` }],
            resource_type: 'image'
        })

        await sql`
            INSERT INTO creations (user_id, content, prompt, type)
            VALUES (${userId}, ${imageUrl},${`Remove the ${object} from image`}, 'image')`;

        res.json({ success: true, content: imageUrl });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//for review the resume file
// const extractTextFromPdf = async (filePath) => {
//     const data = new Uint8Array(fs.readFileSync(filePath));
//     const pdf = await pdfjsLib.getDocument({ data }).promise;

//     let text = "";

//     for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const content = await page.getTextContent();
//         text += content.items.map(item => item.str).join(" ") + "\n";
//     }

//     return text;
// };

// export const reviewresume = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const resume = req.file;
//         const plan = req.plan;

//         if (plan?.toLowerCase() !== "premium") {
//             return res.status(403).json({
//                 success: false,
//                 message:
//                     "This feature is only available for Premium subscription. To continue upgrade to Premium Plan."
//             });
//         }

//         if (!resume) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Resume file is required"
//             });
//         }

//         if (resume.size > 5 * 1024 * 1024) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Resume file size exceeds allowed size (5MB)."
//             });
//         }

//         // ✅ extract text FIRST
//         const resumeText = await extractTextFromPdf(resume.path);

//         // ✅ build prompt AFTER text exists
//         const prompt = `
// Review the following resume and provide constructive feedback on:
// - Strengths
// - Weaknesses
// - Areas for improvement

// Resume content:
// ${resumeText}
// `;

//         const response = await AI.chat.completions.create({
//             model: "gemini-2.5-flash",
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0.7,
//             max_tokens: 500,
//         });

//         const content = response.choices[0].message.content;

//         await sql`
//             INSERT INTO creations (user_id, content, prompt, type)
//             VALUES (${userId}, ${content}, 'Review the uploaded resume', 'text')
//         `;

//         return res.json({ success: true, content });

//     } catch (error) {
//         console.error("RESUME REVIEW ERROR:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };





/* -------------------------------------------------------
   Helper: Trim text to safe size (CRITICAL)
------------------------------------------------------- */
/* -------------------------------------------------------
   Helper: Trim text to safe size
------------------------------------------------------- */
const trimText = (text, maxChars = 4000) => {
    if (!text) return "";
    return text.length > maxChars ? text.slice(0, maxChars) : text;
};

/* -------------------------------------------------------
   Helper: AI call with retry (429 safe)
------------------------------------------------------- */
const callAIWithRetry = async (payload, retries = 2, delayMs = 1500) => {
    try {
        return await AI.chat.completions.create(payload);
    } catch (error) {
        if (error.status === 429 && retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
            return callAIWithRetry(payload, retries - 1, delayMs * 2);
        }
        throw error;
    }
};

/* -------------------------------------------------------
   Controller: Humanize AI Text
------------------------------------------------------- */
export const humanizeText = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { text } = req.body;
        const plan = req.plan;

        /* -------- Plan check -------- */
        if (plan?.toLowerCase() !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is available only for Premium users."
            });
        }

        /* -------- Input validation -------- */
        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Text input is required."
            });
        }

        /* -------- Trim input -------- */
        const safeText = trimText(text, 4000);

        /* -------- Prompt -------- */
        const prompt = `
Rewrite the following AI-generated text so that it sounds natural,
human-written, fluent, and engaging.

Rules:
- Do NOT change the meaning
- Avoid robotic or repetitive phrasing
- Improve sentence flow and tone
- Use natural transitions

Text:
${safeText}
`;

        /* -------- AI call -------- */
        const response = await callAIWithRetry({
            model: "gemini-2.5-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 500
        });

        const content = response.choices[0].message.content;

        /* -------- Save result -------- */
        await sql`
            INSERT INTO creations (user_id, content, prompt, type)
            VALUES (${userId}, ${content}, 'Humanize AI-generated text', 'text')
        `;

        return res.json({
            success: true,
            content
        });

    } catch (error) {

        if (error.status === 429) {
            return res.status(429).json({
                success: false,
                message: "AI service is busy. Please try again later."
            });
        }

        console.error("HUMANIZE TEXT ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


