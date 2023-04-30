import { getListingById } from "@/utils/Listings";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProductPage({ product }: any) {
  const Router = useRouter();
  const productID = Router.query.productID;

  return (
    <div>
      <h1>Producti {productID}</h1>
      <h1>{product.name}</h1>
      <h1>{product.description}</h1>
      <h1>{product.user}</h1>
    </div>
  );
}

export async function getServerSideProps({ query }: any) {
  const productID = query.productID;

  try {
    const product = await getListingById(productID);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default ProductPage;
