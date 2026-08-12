const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Enquiry = require("../models/Enquiry");

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

app.get("/", (req, res) => {
    res.json({
        message: "Gojawai backend is running"
    });
});

app.post("/api/enquiries", async (req, res) => {
    try {
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
            email,
            phone,
            date,
            travellers,
            message
        });

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            enquiry
        });

    } catch (error) {
        console.error("Enquiry error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit enquiry"
        });
    }
});

module.exports = app;