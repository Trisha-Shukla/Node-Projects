import { fetchQueue, updateQueueStatus } from "@/store/slices/queueSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Queue = () => {
  const dispatch = useDispatch();
  const { queue, loading, error } = useSelector((state) => state.queue);
  console.log(queue);
  

  useEffect(() => {
    dispatch(fetchQueue());
  }, [queue.status]);

  const handleUpdateStatus = async (queueNumber, status) => {
    try {
      await dispatch(updateQueueStatus({ queueNumber, status })).unwrap();
      // alert(`Status updated to "${status}" for Queue #${queueNumber}`);
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  if (loading) return <p>Loading queue...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Ensure queue is an array
  const queueArray = Array.isArray(queue) ? queue : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Manage Queue</h1>
      <ul className="space-y-2">
        {queueArray.map((patient) => (
          <li key={patient.queueNumber} className="border p-2">
            <span className="font-bold">#{patient.queueNumber}</span>: {patient.patientName} -{" "}
            <span
              className={
                patient.status === "waiting"
                  ? "text-gray-500"
                  : patient.status === "in progress"
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            >
              {patient.status}
            </span>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => handleUpdateStatus(patient.queueNumber, "in progress")}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                In Progress
              </button>
              <button
                onClick={() => handleUpdateStatus(patient.queueNumber, "completed")}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Completed
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Queue;
