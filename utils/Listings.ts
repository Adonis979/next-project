import axios from "axios";

export const GetListings = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/product`).then((res) => {
    return res.data;
  });
};

export const GetListingsById = async (id: string | string[] | undefined) => {
  console.log(id, "id");
  try {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/product/${id}`)
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    return Promise.reject(error);
  }
};
