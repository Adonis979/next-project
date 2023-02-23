import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

interface FirestoreData {
  name: string;
  category: string;
  description: string;
  photoUrl: string;
  user: string;
  size: string;
  userId: string;
  date: Date;
  docId: string;
}

export const GetListings = (setItems: any) => {
  onSnapshot(
    query(collection(db, "items"), orderBy("date", "desc")),
    (querySnapshot) => {
      const data: FirestoreData[] = querySnapshot.docs.map((doc) => {
        const firestoreTimestamp = doc.data().date;
        const date = firestoreTimestamp.toDate();
        const docId = doc.id;
        return {
          name: doc.data().name,
          category: doc.data().category,
          description: doc.data().description,
          photoUrl: doc.data().photoUrl,
          user: doc.data().user,
          size: doc.data().size,
          userId: doc.data().userId,
          date: date,
          docId: docId,
        };
      });
      setItems(data);
    }
  );
};

export const DeleteListings = async (id: string) => {
  try {
    await deleteDoc(doc(db, "items", `${id}`));
  } catch (error) {
    console.log(error);
  }
};
