const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Enquiry = require("./models/Enquiry");

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gojawai backend is running",
  });
});

// ===============================
// CREATE ENQUIRY
// ===============================
app.post("/api/enquiries", async (req, res) => {
  try {
    const {
      type,
      name,
      email,
      phone,
      date,
      travellers,
      message,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const enquiry = new Enquiry({
      type: type || "enquiry",
      name,
      email: email || "",
      phone,
      date: date || "",
      travellers: travellers || "",
      message: message || "",
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Create enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
});

// ===============================
// GET ALL ENQUIRIES
// ===============================
app.get("/api/enquiries", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("Get enquiries error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
});

// ===============================
// GET SINGLE ENQUIRY
// ===============================
app.get("/api/enquiries/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    console.error("Get single enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiry",
    });
  }
});

// ===============================
// DELETE ENQUIRY
// ===============================
app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
    });
  }
});

// ===============================
// UPDATE ENQUIRY
// ===============================
app.put("/api/enquiries/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update enquiry",
    });
  }
});

// ===============================
// SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});