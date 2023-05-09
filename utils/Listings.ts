import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

interface FirestoreData {
  title: string;
  description: string;
  price?: string;
  color?: string;
  currency?: string;
  photoUrl: string;
  user: string;
  size: string;
  userId: string;
  date: Date;
  docId: string;
}

export const GetListings = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "items"), orderBy("date", "desc"))
  );
  const data: FirestoreData[] | null = querySnapshot.docs.map((doc) => {
    const firestoreTimestamp = doc.data().date;
    const date = firestoreTimestamp.toDate().toISOString();
    const docId = doc.id;
    return {
      title: doc.data().name,
      description: doc.data().description,
      photoUrl: doc.data().photoUrl,
      user: doc.data().user,
      size: doc.data().size,
      userId: doc.data().userId,
      date: date,
      docId: docId,
    };
  });
  return data;
};

export const getListingById = async (listingId: any) => {
  const docRef = doc(db, "items", listingId);
  try {
    const docSnap = await getDoc(docRef);
    const firestoreDate = docSnap.data()?.date;
    const date = firestoreDate.toDate().toISOString();
    const data: FirestoreData = {
      title: docSnap.data()?.name,
      description: docSnap.data()?.description,
      price: docSnap.data()?.price,
      color: docSnap.data()?.color,
      currency: docSnap.data()?.currency,
      photoUrl: docSnap.data()?.photoUrl,
      user: docSnap.data()?.user,
      size: docSnap.data()?.size,
      userId: docSnap.data()?.userId,
      date: date,
      docId: "",
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
    title: string;
    description: string;
    size: string;
    color: string;
    price: string;
    currency: string;
  },
  photoUrl: string[] | null,
  user: { uid: string; name: string }
) => {
  try {
    await addDoc(collection(db, "items"), {
      name: item.title,
      description: item.description,
      price: item.price,
      size: item.size,
      color: item.color,
      currency: item.currency,
      photoUrl: photoUrl,
      user: user.name,
      date: new Date(),
      userId: user?.uid,
    });
  } catch (e) {
    console.log(e);
  }
};

export const GetProfileListing = (setItems: any, id: string | null) => {
  const queryRef = query(collection(db, "items"), where("userId", "==", id));
  onSnapshot(queryRef, (querySnapshot) => {
    const data: FirestoreData[] = querySnapshot.docs.map((doc) => {
      const firestoreTimestamp = doc.data().date;
      const date = firestoreTimestamp.toDate();
      const docId = doc.id;
      return {
        title: doc.data().name,
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
  });
};
