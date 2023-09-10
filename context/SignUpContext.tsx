import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import EmailVerificationModal from "@/components/EmailVerificationModal";
import { Backdrop, CircularProgress } from "@mui/material";
import { useCookies } from "react-cookie";

const SignUpContext = createContext<any>({});

export const SignUpContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    type: "normal",
  });
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState({
    error: false,
    helperText: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    helperText: "",
  });
  const [subscription, setSubscription] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);

  const signup = async (
    email: string,
    password: string,
    UserName: string,
    type: string
  ) => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/auth/register`,
        {
          username: UserName,
          email: email,
          password: password,
          type: type,
        }
      );
      if (result.status === 201) {
        setCookie("token", result.data.token, {
          maxAge: 1800,
          path: "/",
        });
      } else {
        router.push("/login");
        setLoader(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setUser({ ...user, [name]: value });
  };

  const handleChangeSubscription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSubscription(value);
    localStorage.setItem("subscriptionPlan", value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordReg = /^(?=.*\d).{8,}$/;
    if (!passwordReg.test(user.password)) {
      setPasswordError({
        error: true,
        helperText: "Password must contain 8 characters and at least a number",
      });
    } else {
      setLoader(true);
      try {
        await signup(user.email, user.password, user.name, user.type);
      } catch (error: any) {
        if (error.response && error.response.status === 418) {
          setCookie("token", error.response.data.token, {
            maxAge: 1800,
            path: "/",
          });
        }
        setEmailError({ error: true, helperText: "Email already in use" });
      }
      setLoader(false);
    }
  };

  return (
    <SignUpContext.Provider
      value={{
        user,
        handleSubmit,
        handleChange,
        passwordError,
        emailError,
        setUser,
        subscription,
        handleChangeSubscription,
        setSubscription,
      }}
    >
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loader}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => useContext(SignUpContext);
