import { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);

      if (!response) {
        throw new Error("Couldn't sign the user up");
      }

      
      await response.user.updateProfile({ displayName });

      
      dispatch({ type: "LOGIN", payload: response.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { isPending, error, signup };
};
