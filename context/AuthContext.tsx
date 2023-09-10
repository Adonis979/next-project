import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { authenticateFunction } from "@/utils/sendCredentials";
import { useCookies } from "react-cookie";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const Router = useRouter();
  const [cookie, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);

  const getUser = () => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_KEY}/users/me`,
          authenticateFunction(cookie)
        )
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        });
    } catch (error) {}
  };

  const login = async (email: string, password: string) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          setCookie("token", res.data.token, {
            maxAge: 1800,
          });
          Router.push({
            pathname: "/sign-up",
            query: {
              step: 2,
              type: "business",
              forward: 1,
            },
          });
        } else {
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);
          Router.push("/");
          getUser();
        }
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
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
