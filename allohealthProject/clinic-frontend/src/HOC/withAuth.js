import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
      return <p>Loading...</p>; // Show a loading message while verifying
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
