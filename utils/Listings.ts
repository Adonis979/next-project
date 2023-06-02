import axios from "axios";

export const GetListings = async () => {
  await axios.get("http://localhost:5000/api/product").then((res) => {
    return res.data;
  });
};

export const GetListingsById = async (id: string | string[] | undefined) => {
  console.log(id, "id");
  try {
    await axios.get(`http://localhost:5000/api/product/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
