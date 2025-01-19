import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Queue
export const fetchQueue = createAsyncThunk("queue/fetchQueue", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:8080/api/queue", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Failed to fetch queue");
  }
});

// Add Queue
export const addQueue = createAsyncThunk(
  "queue/addQueue",
  async (newPatient, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/api/queue", newPatient, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to add to queue");
    }
  }
);

// Update Queue Status
export const updateQueueStatus = createAsyncThunk(
  "queue/updateQueueStatus",
  async ({ queueNumber, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/queue/${queueNumber}/status`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to update status");
    }
  }
);

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    loading: false,
    error: null,
    queue: [],
  },
  extraReducers: (builder) => {
    builder
      // Fetch Queue
      .addCase(fetchQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.queue = action.payload;
      })
      .addCase(fetchQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Queue
      .addCase(addQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.queue.push(action.payload); // Add new patient to the queue
      })
      .addCase(addQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Queue Status
      .addCase(updateQueueStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQueueStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.queue = action.payload.queue; // Update the queue with the latest data
      })
      .addCase(updateQueueStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default queueSlice.reducer;
