const mongoose = require("mongoose");
const cors = require("cors");

const Enquiry = require("../models/Enquiry");

const corsMiddleware = cors({
    origin: "*",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
});

module.exports = async function handler(req, res) {

    // CORS
    await new Promise((resolve, reject) => {
        corsMiddleware(req, res, (result) => {
            if (result instanceof Error) {
                reject(result);
            } else {
                resolve(result);
            }
        });
    });

    // Preflight
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    // Only POST
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const {
            type,
            name,
            email,
            phone,
            date,
            travellers,
            message
        } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and phone are required"
            });
        }

        const enquiry = await Enquiry.create({
            type: type || "enquiry",
            name,
            email: email || "",
            phone,
            date: date || "",
            travellers: travellers || "",
            message: message || ""
        });

        return res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            enquiry
        });

    } catch (error) {

        console.error("Enquiry error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to submit enquiry"
        });
    }
};