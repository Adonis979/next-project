import { db } from "@/firebase";
import {
  addDoc,
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

export const DeleteListings = async (id: string | undefined) => {
  if (id) {
    try {
      await deleteDoc(doc(db, "items", `${id}`));
    } catch (error) {
      console.log(error);
    }
  }
};

export const AddListing = async (
  item: {
    name: string;
    description: string;
    size: string;
    category: string;
  },
  photoUrl: string | null,
  user: { uid: string; name: string },
  setSnackBar: any
) => {
  try {
    await addDoc(collection(db, "items"), {
      name: item.name,
      description: item.description,
      size: item.size,
      category: item.category,
      photoUrl: photoUrl,
      user: user.name,
      date: new Date(),
      userId: user?.uid,
    });
  } catch (e) {
    setSnackBar({
      show: true,
      severity: "error",
      text: "Something went wrong try again",
    });
  }
};
