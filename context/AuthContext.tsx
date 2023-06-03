import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { authenticateFunction } from "@/utils/sendCredentials";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const Router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);

  const getUser = () => {
    const authenticate = authenticateFunction();
    try {
      axios
        .get("http://localhost:5000/api/users/me", authenticate)
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        });
    } catch (error) {}
  };

  const signup = async (email: string, password: string, UserName: string) => {
    await axios
      .post("http://localhost:5000/api/auth/register", {
        username: UserName,
        email: email,
        password: password,
      })
      .then(() => Router.push("/login"));
  };

  const login = async (email: string, password: string) => {
    await axios
      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        Router.push("/");
        getUser();
      });
  };

  // const LoginWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   provider.setCustomParameters({ prompt: "select_account" });
  //   return signInWithPopup(auth, provider);
  // };

  // const LoginWithFacebook = () => {
  //   const provider = new FacebookAuthProvider();
  //   provider.setCustomParameters({ propmt: "select_account" });
  //   return signInWithPopup(auth, provider);
  // };

  const logout = async () => {
    Router.push("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
