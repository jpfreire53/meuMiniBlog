import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
  startAfter,
} from "firebase/firestore";

export const useFetchDocuments = (
  docCollection,
  search = null,
  uid = null,
  page = 1,
  pageSize = 10
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;
      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q = query(
          collectionRef,
          orderBy("createdAt", "desc"),
          limit(pageSize)
        );

        if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc"),
            limit(pageSize)
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc"),
            limit(pageSize)
          );
        }

        if (page > 1) {
          const lastDocument = documents[documents.length - 1];
          if (lastDocument) {
            const startAfterRef = startAfter(lastDocument.createdAt);
            q = query(q, startAfterRef);
          }
        }

        await onSnapshot(q, (QuerySnapshot) => {
          setDocuments(
            QuerySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled, page, pageSize, documents]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
