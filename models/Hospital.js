const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    images: {
      type: [{ id: { type: String }, url: { type: String } }],
      required: true,
    },

    doctors: {
      type: [
        {
          id: {
            type: String,
            required: true,
            unique: true
          },
          name: {
            type: String,
            required: true,
          },
          experience: {
            type: String,
            required: true,
          },
          speciality: {
            type: String,
          },
          contact: {
            type: String,
          },
          department: {
            type: String,
            required: true,
          },
          Intime: {
            type: String,
            required: true,
          },
          Outtime: {
            type: String,
            required: true,
          },
          days: {
            type: [String],
            required: true
          },
        },
      ],
    },
    Test: {
      type: [
        {
          id: {
            type: String,
            required: true
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      ],
    },
    BloodBank: 
      {
        type: [
          {
            type: { type: String },
            available: { type: Boolean },
            contact: { type: String },
          },
        ],
      },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Hospital", Schema);
