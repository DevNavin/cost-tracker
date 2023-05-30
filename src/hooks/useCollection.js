import { useEffect, useRef, useState } from "react";
import { fireStore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = fireStore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubs = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        
        setDocuments(results);
      },
      (error) => {
        console.log(error);
        setError(error);
      }
    );

    return () => unsubs();
  }, [collection, query, orderBy]);

  return { documents, error };
};
