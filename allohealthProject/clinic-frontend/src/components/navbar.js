import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/slices/userSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  // Ensure this logic only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'} className="text-xl font-bold cursor-pointer">
        Clinic Management
        </Link>
        <div className="space-x-4">
          {isClient && isAuthenticated ? (
            <>
              <span>Welcome, {user?.name || "User"}!</span>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 cursor-pointer"
              >
                Logout
              </button>
              <Link href="/addDoctor" className="hover:text-blue-400">
            Add Doctor
          </Link>
          <Link href="/doctor" className="hover:text-blue-400">
            Doctors List
          </Link>
          <Link href="/queue" className="hover:text-blue-400">
            Manage Queue
          </Link>
            </>
          ) : (
            isClient && (
              <>
                <Link href="/login" className="hover:text-blue-400">
                  Login
                </Link>
                <Link href="/register" className="hover:text-blue-400">
                  Register
                </Link>
              </>
            )
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
