import {setLoading,setError,setUser} from "../state/auth.slice";
import { registerUser } from "../services/auth.api";
import { loginUser } from "../services/auth.api";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    async function handleRegisterUser(email, phoneNumber, password, isBuyer) {
        try{
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await registerUser({ email, phoneNumber, password, isBuyer });
            dispatch(setUser(response));
            return response;
        }catch(error){
            dispatch(setError(error.message));
            throw error;
        }finally{
            dispatch(setLoading(false));
        }
    }

    async function handleLoginUser(email, password) {
        try{
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await loginUser({ email, password });
            dispatch(setUser(response));
            return response;
        }catch(error){
            dispatch(setError(error.message));
            throw error;
        }finally{
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegisterUser,
        handleLoginUser,
        loading,
        error,
    }
}