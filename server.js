import axios from "axios";
import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

app.get("/api/geocode", async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: "Address is required" });
    }

    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address,
                key: process.env.TRAVIX_API_KEY
            }
        });

        res.json(response.data);
    } catch (e) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

app.get("/api/autocomplete-place", async (req, res) => {
    const { input } = req.query;

    if (!input) {
        return res.status(400).json({ error: "Input is required" });
    }

    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input,
                key: process.env.TRAVIX_API_KEY
            }
        });

        res.json(response.data);
    } catch (e) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})