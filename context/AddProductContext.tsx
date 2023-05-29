import { AddListing } from "@/utils/Listings";
import { uploadFiles } from "@/utils/UploadImage";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { SelectChangeEvent } from "@mui/material";
import {
  validateNotEmpty,
  validateOnlyLetters,
  validateOnlyNumbers,
} from "@/utils/validate";
import { validate } from "uuid";
import axios from "axios";

export interface PhotoFile extends File {
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
    color: "#FFFFFF",
    price: "",
    currency: "",
  });

  const [titleError, setTitleError] = useState({
    error: false,
    helperText: "",
  });
  const [descriptionError, setDescriptionError] = useState({
    error: false,
    helperText: "",
  });
  const [photoError, setPhotoError] = useState({
    error: false,
    helperText: "",
  });
  const [peopleCategoryError, setPeopleCategoryError] = useState({
    error: false,
    helperText: "",
  });
  const [clothesCategoryError, setClothesCategoryError] = useState({
    error: false,
    helperText: "",
  });
  const [sizeError, setSizeError] = useState({ error: false, helperText: "" });
  const [colorError, setColorError] = useState({
    error: false,
    helperText: "",
  });
  const [priceError, setPriceError] = useState({
    error: false,
    helperText: "",
  });
  const [currencyError, setCurrencyError] = useState({
    error: false,
    helperText: "",
  });

  const handleClick = (value: string) => {
    setProduct({ ...product, color: value });
  };
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

  const validate = () => {
    const title = validateOnlyLetters(product.title, setTitleError);
    const peopleCategory = validateNotEmpty(
      product.peopleCategory,
      setPeopleCategoryError
    );
    const clothesCategory = validateNotEmpty(
      product.clothesCategory,
      setClothesCategoryError
    );
    const description = validateNotEmpty(
      product.description,
      setDescriptionError
    );
    const photo = validateNotEmpty(photos, setPhotoError);
    const color = validateNotEmpty(product.color, setColorError);
    const size = validateNotEmpty(product.size, setSizeError);
    const price = validateOnlyNumbers(product.price, setPriceError);
    const currency = validateNotEmpty(product.currency, setCurrencyError);

    if (
      !title &&
      !peopleCategory &&
      !clothesCategory &&
      !description &&
      !photo &&
      !color &&
      !size &&
      !price &&
      !currency
    ) {
      return true;
    } else return false;
  };

  const handleSubmit = async () => {
    const valid = validate();
    if (valid) {
      setLoading(true);
      let photoUrls: string[] = [];
      await uploadFiles(photos, product.title).then((urls) => {
        photoUrls = urls;
      });
      AddListing(product, photoUrls, user);
      setLoading(false);
    }
    // const formData = new FormData();
    // formData.append("title", product.title);
    // formData.append("description", product.description);
    // formData.append("price", product.price);
    // formData.append("size", product.size);
    // photos.forEach((photo) => {
    //   formData.append(`photo[]`, photo);
    // });
    // formData.append("peopleCategory", product.peopleCategory);
    // formData.append("clothesCategory", product.clothesCategory);
    // formData.append("color", product.color);
    // formData.append("currency", product.currency);

    try {
      await axios.post(
        "http://localhost:5000/api/product/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkMmEzNGMzMWU0ZjM3ZjdjODQ0MTYiLCJpYXQiOjE2ODUyOTYxNzJ9.KbfyKRvUVf7wgF6yQaXnNg9xL4n5j_fQp70VtTviklI",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddProductContext.Provider
      value={{
        product,
        photos,
        loading,
        titleError,
        peopleCategoryError,
        clothesCategoryError,
        descriptionError,
        photoError,
        colorError,
        sizeError,
        priceError,
        currencyError,
        handleChange,
        handleAddPhoto,
        handleSubmit,
        handleDelete,
        handleClick,
      }}
    >
      {children}
    </AddProductContext.Provider>
  );
};

export const useAddProductContext = () => useContext(AddProductContext);
