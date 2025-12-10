    // 1. Load Environment Variables from .env file
import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import { createClient } from '@supabase/supabase-js';

const PORT = process.env.PORT || 3001;
const SUPABASE_URL = process.env.SUPABASE_URL;
const supabaseAdmin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }, // Prevent caching of user session
});

const app = express();

// Middleware 1: Enable CORS (Allows your frontend to talk to this server)
/*app.use((req, res, next) => {
    // Replace 'http://localhost:3000' with your actual frontend address in production
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});*/

app.use(cors());

// Middleware 2: JSON body parsing
app.use(express.json());

// Create endpoint and get average of IT salaries for each year
app.get('/api/salaries', async (req, res) => {
    console.log("Request received for /api/salaries");

    // The admin client is used to fetch data bypassing Row Level Security
    const { data, error } = await supabaseAdmin
        .rpc('get_yearly_average_salary')

    if (error) {
        console.error("Supabase Error:", error);

        return res.status(500).json({
            message: 'Database fetch failed',
            details: error.message
        });
    }

    res.json(data);
});


// Start the server
app.listen(PORT, () => {
    console.log(`✅ Backend server listening securely on http://localhost:${PORT}`);
});