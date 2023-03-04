import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user?.uid,
          email: user?.email,
          photo: user?.photoURL,
          name: user?.displayName,
          emailVerified: user?.emailVerified,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  const signup = async (email: string, password: string, UserName: string) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredentials.user, { displayName: UserName });
  };
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  };

  const LoginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({ propmt: "select_account" });
    return signInWithPopup(auth, provider);
  };

  const logout = async () => {
    Router.push("/login");
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        LoginWithGoogle,
        LoginWithFacebook,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
