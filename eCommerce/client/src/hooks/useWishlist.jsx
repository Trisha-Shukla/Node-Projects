import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../axios.config";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUserWishlist } from "../store/authSlice/authSlice";


export const useWishlist = (product) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const [isInWishlist, setIsInWishlist] = useState(user?.wishlist?.includes(product?._id) || false);

  const handleWishlistToggle = async (action) => {
    if (!isAuthenticated) {
      const path = location.pathname;
      navigate("/login/?refere=" + encodeURIComponent(path));
      return;
    }

    const endpoint = action === "add" ? "/user/wishList/add" : "/user/wishList/remove";
    try {
      const res = await instance.post(endpoint, { productId: product._id });
      if (res.status === 200) {
        dispatch(updateUserWishlist({ productId: product._id, actionType: action }));
      }
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${action} product from wishlist.`);
      console.error(`Error while trying to ${action} product from wishlist`, error);
    }
  };

  useEffect(() => {
    setIsInWishlist(user?.wishlist?.includes(product?._id) || false);
  }, [user?.wishlist, product?._id]);

  return { isInWishlist, handleWishlistToggle };
};
