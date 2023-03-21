const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
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
  contact: {
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
  zip: {
    type: String,
    required: true,
  },
  images: {
    type: [{ id: { type: String }, url: { type: String } }],
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  doctors: {
    type: [
      {
        id: {
          type: String,
          required: true,
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
        days: [{ day: { type: String } }],
      },
    ],
  },
  Test: {
    Type: [
      {
        id: {
          type: String,
          required: true,
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
  BloodBank: [
    {
      type: [
        {
          Type: { type: int },
          available: { type: int },
          contact: { type: String },
        },
      ],
    },
  ],
},{timestamps:true})
module.exports = mongoose.model('Hosptl', Schema);