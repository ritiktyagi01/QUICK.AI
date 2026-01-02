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



export const generateImage = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { prompt, publish } = req.body;
        const plan = req.plan;


        if (!prompt || !publish) {
            return res.status(400).json({
                success: false,
                message: "Prompt and Publish are required"
            });
        }

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available for Premium subscription. To continue upgrade to Premium Plan."
            });
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer",
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
        // What this line is meant to do
        // It converts binary image data into a Base64 Data URL, which can be:
        // Sent in JSON
        // Embedded directly in HTML or frontend code
        // Used in AI image APIs or previews
        // In simple terms:
        // It turns raw image data into a browser-readable Base64 image string.


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



