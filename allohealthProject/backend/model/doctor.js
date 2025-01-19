import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  gender: { type: String },
  location: { type: String },
  availability: [{ day: String, times: [String] }],
});

export const Doctor = mongoose.model('Doctor', doctorSchema);
