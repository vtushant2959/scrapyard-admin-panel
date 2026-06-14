import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase-config.js";

class FirestoreService {
  /* =========================
     GET ALL DOCUMENTS
  ========================= */
  async getCollection(collectionName) {
    try {
      const snapshot = await getDocs(
        collection(db, collectionName)
      );

      return snapshot;
    } catch (error) {
      console.error(
        "Error fetching collection:",
        error
      );
      throw error;
    }
  }

  /* =========================
     GET SINGLE DOCUMENT
  ========================= */
  async getDocument(collectionName, id) {
    try {
      const documentSnapshot =
        await getDoc(
          doc(db, collectionName, id)
        );

      return documentSnapshot;
    } catch (error) {
      console.error(
        "Error fetching document:",
        error
      );
      throw error;
    }
  }

  /* =========================
     ADD DOCUMENT
  ========================= */
  async addDocument(collectionName, data) {
    try {
      const documentRef =
        await addDoc(
          collection(db, collectionName),
          {
            ...data,
            createdAt:
              serverTimestamp(),
            updatedAt:
              serverTimestamp()
          }
        );

      return documentRef;
    } catch (error) {
      console.error(
        "Error adding document:",
        error
      );
      throw error;
    }
  }

  /* =========================
     UPDATE DOCUMENT
  ========================= */
  async updateDocument(
    collectionName,
    id,
    data
  ) {
    try {
      const documentRef = doc(
        db,
        collectionName,
        id
      );

      await updateDoc(
        documentRef,
        {
          ...data,
          updatedAt:
            serverTimestamp()
        }
      );

      return true;
    } catch (error) {
      console.error(
        "Error updating document:",
        error
      );
      throw error;
    }
  }

  /* =========================
     DELETE DOCUMENT
  ========================= */
  async deleteDocument(
    collectionName,
    id
  ) {
    try {
      await deleteDoc(
        doc(
          db,
          collectionName,
          id
        )
      );

      return true;
    } catch (error) {
      console.error(
        "Error deleting document:",
        error
      );
      throw error;
    }
  }

  /* =========================
     QUERY DOCUMENTS
  ========================= */
  async queryDocuments(
    collectionName,
    field,
    operator,
    value
  ) {
    try {
      const q = query(
        collection(db, collectionName),
        where(
          field,
          operator,
          value
        )
      );

      const snapshot =
        await getDocs(q);

      return snapshot;
    } catch (error) {
      console.error(
        "Error querying documents:",
        error
      );
      throw error;
    }
  }

  /* =========================
     ORDERED DOCUMENTS
  ========================= */
  async getOrderedDocuments(
    collectionName,
    field = "createdAt",
    direction = "desc",
    maxLimit = 10
  ) {
    try {
      const q = query(
        collection(db, collectionName),
        orderBy(
          field,
          direction
        ),
        limit(maxLimit)
      );

      const snapshot =
        await getDocs(q);

      return snapshot;
    } catch (error) {
      console.error(
        "Error fetching ordered docs:",
        error
      );
      throw error;
    }
  }

  /* =========================
     REALTIME LISTENER
  ========================= */
  listenToCollection(
    collectionName,
    callback
  ) {
    try {
      return onSnapshot(
        collection(
          db,
          collectionName
        ),
        callback
      );
    } catch (error) {
      console.error(
        "Realtime listener error:",
        error
      );
      throw error;
    }
  }

  /* =========================
     BATCH DELETE
  ========================= */
  async batchDelete(
    collectionName,
    ids
  ) {
    try {
      const batch =
        writeBatch(db);

      ids.forEach((id) => {
        const docRef = doc(
          db,
          collectionName,
          id
        );

        batch.delete(docRef);
      });

      await batch.commit();

      return true;
    } catch (error) {
      console.error(
        "Batch delete error:",
        error
      );
      throw error;
    }
  }
}

const firestoreService =
  new FirestoreService();

export default firestoreService;