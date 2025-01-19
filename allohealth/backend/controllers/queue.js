import { Queue } from "../model/queue.js";


// Add a patient to the queue
export const addToQueue = async (req, res) => {
  try {
    const queueNumber = await Queue.countDocuments() + 1;
    const queueItem = new Queue({ ...req.body, queueNumber });
    await queueItem.save();
    res.status(201).json(queueItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all queue items
export const getQueue = async (req, res) => {
  try {
    const queue = await Queue.find();
    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateQueue = async (req, res) => {
  try {
    console.log("queue");
    
    const queueNumber = parseInt(req.params.queueNumber, 10);

    // Validate queueNumber
    if (isNaN(queueNumber)) {
      return res.status(400).json({ message: "Invalid queue number" });
    }

    const { status } = req.body;

    // Validate input status
    if (!status || !["waiting", "in progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find and update the queue item in the database
    const updatedQueue = await Queue.findOneAndUpdate(
      { queueNumber }, // Find the document with this queueNumber
      { status }, // Update the status
      { new: true } // Return the updated document
    );

    if (!updatedQueue) {
      return res.status(404).json({ message: "Patient not found" });
    }
    console.log("update");
    

    return res.status(200).json({ message: "Status updated successfully", queue: updatedQueue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


