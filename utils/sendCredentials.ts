import { useCookies } from "react-cookie";

export const authenticateFunction = (cookie?: any) => {
  const token = localStorage.getItem("token");

  if (token || cookie) {
    const authenticate = {
      headers: {
        "x-auth-token": `${token || cookie.token}`, // Include the token in the Authorization header
      },
    };
    return authenticate;
  }
};
