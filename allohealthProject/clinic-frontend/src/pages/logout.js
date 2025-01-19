import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import { useRouter } from "next/router";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logoutUser());
    router.push("/login"); // Redirect to login page after logout
  }, [dispatch, router]);

  return <p>Logging out...</p>;
};

export default Logout;
