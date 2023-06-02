const token = localStorage.getItem("token");

export const authenticate = {
  headers: {
    "x-auth-token": `${token}`, // Include the token in the Authorization header
  },
};
