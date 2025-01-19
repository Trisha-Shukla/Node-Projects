import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add Doctor API
export const addDoctor = createAsyncThunk(
  "doctor/addDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      console.log(doctorData);
      const response = await axios.post("http://localhost:8080/api/doctors", doctorData, {
        withCredentials: true, // Send cookies for authentication
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to add doctor");
    }
  }
);

// Get Doctors API
export const getDoctors = createAsyncThunk(
  "doctor/getDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/api/doctors", {
        withCredentials: true, // Send cookies for authentication
      });
      return response.data; // Assume the response contains an array of doctors
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch doctors");
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    loading: false,
    error: null,
    success: false,
    doctors: [], // Array of doctors
  },
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Doctor
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Doctors
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload; // Update the list of doctors
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = doctorSlice.actions;
export default doctorSlice.reducer;
