const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "enquiry"
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      required: true
    },

    date: {
      type: String,
      default: ""
    },

    travellers: {
      type: String,
      default: ""
    },

    message: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);