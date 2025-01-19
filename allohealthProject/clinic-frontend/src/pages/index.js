
import { addQueue, fetchQueue } from "@/store/slices/queueSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { queue, loading, error } = useSelector((state) => state.queue);
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  useEffect(() => {
    dispatch(fetchQueue()); // Fetch queue on page load
  }, [dispatch]);

  const handleScheduleAppointment = async () => {
    if (!patientName || !appointmentDate) {
      alert("Please enter both patient name and appointment date.");
      return;
    }

    try {
      await dispatch(
        addQueue({
          patientName,
          appointmentDate,
          status: "waiting",
        })
      ).unwrap(); // Dispatch the API call to add a new patient
      alert(`Appointment scheduled for ${patientName} on ${appointmentDate}`);
      setPatientName("");
      setAppointmentDate("");
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Clinic Front Desk</h1>

      {/* Current Queue */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-2">Current Queue</h2>
        {loading ? (
          <p>Loading queue...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="bg-white shadow rounded p-4 space-y-2">
            {queue.length > 0 ? (
              queue.map((patient, index) => (
                <li
                  key={index}
                  className="border p-2 flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold">#{index + 1}:</span>{" "}
                    {patient.patientName} - {patient.appointmentDate}
                  </div>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      patient.status === "waiting"
                        ? "bg-yellow-200"
                        : patient.status === "in progress"
                        ? "bg-blue-200"
                        : "bg-green-200"
                    }`}
                  >
                    {patient.status}
                  </span>
                </li>
              ))
            ) : (
              <p>No patients in the queue.</p>
            )}
          </ul>
        )}
      </div>

      {/* Schedule Appointment */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-2">
          Schedule Appointment
        </h2>
        <div className="bg-white shadow rounded p-4 space-y-4">
          <div>
            <label className="block text-gray-700">Patient Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <button
            onClick={handleScheduleAppointment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
