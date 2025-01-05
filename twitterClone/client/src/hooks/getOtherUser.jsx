import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { getOtherUser } from "../store/userSlice";


const useOtherUsers = () => {
    console.log("reached here");
    
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/users`,{
                    withCredentials:true
                });
                console.log(res);
                dispatch(getOtherUser(res?.data.user));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    },[]);
};
export default useOtherUsers;