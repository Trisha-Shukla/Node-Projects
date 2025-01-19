import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "@/store/slices/doctorSlice";
import { useRouter } from "next/router";

const AddDoctor = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, success } = useSelector((state) => state.doctor);

  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
    gender: "",
    location: "",
    availability: [],
  });

  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [availabilityList, setAvailabilityList] = useState([]);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleAddAvailability = () => {
    if (day && time) {
      setAvailabilityList([...availabilityList, { day, times: [time] }]);
      setDay("");
      setTime("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor({ ...doctorData, availability: availabilityList }));
  };

  if (success) {
    router.push("/"); // Redirect to homepage or doctor listing page
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Add Doctor</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Doctor's Name"
          value={doctorData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctorData.specialization}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={doctorData.gender}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={doctorData.location}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <div>
          <h3 className="font-bold">Availability</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Day (e.g., Monday)"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Time (e.g., 9:00 AM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 w-full"
            />
            <button
              type="button"
              onClick={handleAddAvailability}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul>
            {availabilityList.map((item, index) => (
              <li key={index} className="text-sm text-gray-600">
                {item.day}: {item.times.join(", ")}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
          disabled={loading}
        >
          {loading ? "Adding Doctor..." : "Add Doctor"}
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
