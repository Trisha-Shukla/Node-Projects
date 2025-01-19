import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors } from "@/store/slices/doctorSlice";

const DoctorList = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctors()); // Fetch doctors on component load
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Doctors List</h1>
      <ul className="space-y-2">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="border p-2">
            {doctor.name} - {doctor.specialization}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
