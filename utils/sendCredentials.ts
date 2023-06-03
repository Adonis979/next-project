export const authenticateFunction = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const authenticate = {
      headers: {
        "x-auth-token": `${token}`, // Include the token in the Authorization header
      },
    };
    return authenticate;
  }
};
