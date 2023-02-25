import { DeleteListings } from "@/utils/Listings";
import { createContext, useContext, useState } from "react";

const ShopContext = createContext<any>({});

export const ShopContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteListing = (id: string) => {
    setOpenDeleteModal(true);
    DeleteListings(id);
    setOpenDeleteModal(false);
  };
  return (
    <ShopContext.Provider
      value={{
        handleDeleteListing,
        openDeleteModal,
        setOpenDeleteModal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
