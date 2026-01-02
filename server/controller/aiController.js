// import OpenAI from "openai";
// import sql from "../config/db.js";
// import { clerkClient } from "@clerk/express";

// const AI = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

// export const generateArticle = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const { prompt, length } = req.body;
//         const plan = req.plan;
//         const free_usage = req.free_usage;

//         if (plan !== 'premium' && free_usage >= 10) {
//             return res.json({ success: false, message: 'You have reached your free usage limit and Upgrade to Premium to continue.' })
//         }
//         else {
//             const response = await AI.chat.completions.create({
//                 model: "gemini-2.5-flash",
//                 messages: [

//                     {
//                         role: "user",
//                         content: prompt,
//                     },
//                 ],
//                 temperature: 0.7,
//                 max_tokens: length,
//             });
//         }
//         const content = response.choices[0].message.content;
//         await sql`INSERT INTO creations (user_id, content,prompt, type )
//                       VALUES(${userId},${content},${prompt},'article')`;

//         if (plan !== 'premium') {
//             await clerkClient.users.updateUserMetadata(userId, {
//                 privateMetadata: {
//                     free_usage: free_usage + 1
//                 }
//             })
//         }
//         res.json({ success: true, content });

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });

//     }
// }


import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import FormData from "form-data";
import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'
import pdf from "pdf-parse/lib/pdf-parse.js"

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

//For Article Generator 
export const generateArticle = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (!prompt || !length) {
            return res.status(400).json({
                success: false,
                message: "Prompt and length are required"
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
            max_tokens: length
        });

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
        const userId = req.auth.userId;
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt  isrequired"
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
            max_tokens: 100
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

        const userId = req.auth(); // FIX 1
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (!prompt) { // FIX 2
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (plan != "premium") {
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
        const userId = req.auth();
        const { image } = req.file;
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
            VALUES (${userId}, ${secure_url},'Remove the background from image, 'image')`;

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
        const userId = req.auth();
        const { image } = req.file;
        const { object } = req.body;
        const plan = req.plan;


        if (!prompt) {
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

export const reviewresume = async (req, res) => {
    try {
        const userId = req.auth();
        const resume = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available for Premium subscription. To continue upgrade to Premium Plan."
            });
        }

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "Resume file size exceeds allowed size (5MB). " })
        }
        const dataBuffer = fs.readFileSync(resume.path);
        const pdfData = await pdf(dataBuffer)
        const prompt = ` Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement . Resume content:${pdfData.text}`

        const response = await AI.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [ {role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 1000
        });

        const content = response.choices[0].message.content;
        //This line extracts the AI-generated text from the API response and stores it in content.


        await sql`
            INSERT INTO creations (user_id, content, prompt, type)
            VALUES (${userId}, ${content},'Review the uploaded resume', 'text')`;

        res.json({ success: true, content });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
