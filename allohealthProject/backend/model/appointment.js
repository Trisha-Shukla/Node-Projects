import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  time: { type: String, required: true },
  status: { type: String, default: 'booked' },
});

export const Appointment= mongoose.model('Appointment', appointmentSchema);
