import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { firebaseAuth } from "../firebase/config";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      
      const res = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );

      
      dispatch({ type: "LOGIN", payload: res.user });

      
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

 
  return { isPending, error, login };
};
