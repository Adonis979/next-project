import { AddListing } from "@/utils/Listings";
import { uploadFiles } from "@/utils/UploadImage";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { SelectChangeEvent } from "@mui/material";

interface PhotoFile extends File {
  readonly lastModified: number;
  readonly name: string;
  readonly size: number;
  readonly type: string;
}
interface Product {
  title: string;
  description: string;
  peopleCategory: string;
  clothesCategory: string;
  size: string;
  color: string;
  price: string;
  currency: string;
}

const AddProductContext = createContext<any>({});

export const AddProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    peopleCategory: "Women",
    clothesCategory: "",
    size: "",
    color: "",
    price: "",
    currency: "",
  });
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event:
      | SelectChangeEvent<any>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    setProduct({ ...product, [name]: value });
  };

  const handleAddPhoto = (acceptedFile: PhotoFile[]) => {
    setPhotos([...photos, ...acceptedFile]);
  };

  const handleDelete = (event: any, index: number) => {
    event.stopPropagation();
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let photoUrls: string[] = [];
    await uploadFiles(photos, product.title).then((urls) => {
      photoUrls = urls;
    });
    AddListing(product, photoUrls, user);
    setLoading(false);
  };

  return (
    <AddProductContext.Provider
      value={{
        product,
        photos,
        loading,
        handleChange,
        handleAddPhoto,
        handleSubmit,
        handleDelete,
      }}
    >
      {children}
    </AddProductContext.Provider>
  );
};

export const useAddProductContext = () => useContext(AddProductContext);
