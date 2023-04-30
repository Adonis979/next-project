import { getListingById } from "@/utils/Listings";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProductPage() {
  const Router = useRouter();
  const productID = Router.query.productID;
  const [product, setProduct] = useState<FirestoreData>({
    name: "",
    category: "",
    description: "",
    photoUrl: "",
    user: "",
    size: "",
    userId: "",
    date: "",
    docId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await getListingById(productID);
        setProduct(item);
      } catch (error) {
        console.log(error);
        // handle the error if needed
      }
    };
    fetchData();
  }, [productID]);

  return (
    <div>
      <h1>Producti {productID}</h1>
      <h1>{product.name}</h1>
      <h1>{product.description}</h1>
      <h1>{product.user}</h1>
    </div>
  );
}

export default ProductPage;
