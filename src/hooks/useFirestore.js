import { useReducer, useState, useEffect } from "react";
import { fireStore, timeStamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        error: action.payload,
        isPending: false,
        success: false,
        document: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

 
  const ref = fireStore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timeStamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();

      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
