interface FirestoreData {
  title: string;
  description: string;
  price: number;
  currency: string;
  photos: string[];
  size: string;
  date: string;
  color: string;
  peopleCategory: string;
  clothesCategory: string;
  _id: string;
  publisher: {
    username: string;
    email: string;
    phoneNumber: string;
    profilePicture: string;
    type: string;
  };
}
