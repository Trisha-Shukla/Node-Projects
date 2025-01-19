import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  queueNumber: { type: Number, required: true },
  status: { type: String, default: 'waiting' },
});

export const Queue = mongoose.model('Queue', queueSchema);
