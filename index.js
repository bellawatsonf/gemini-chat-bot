import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();



const app = express();//buat server
const port = process.env.PORT || 3000;//buat port
app.use(cors());
app.use(express.json());   
app.use(express.static('public'));//buat static file

const genAi = new GoogleGenAI({apiKey: process.env.GOOGLE_GEMINI_API_KEY});

app.post('/api/chat', async(req, res) => {
    const { message } = req.body;
    if(!message) return res.status(400).json({reply: 'Message is required'});
    try {
        const result = await genAi.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,

        })
        const text = result.text;
        res.json({reply: text});
    } catch (error) {
        console.error(error);
        res.status(500).json({reply: 'Something went wrong'});
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});