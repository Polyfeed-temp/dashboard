import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase.service";
import { signInWithGoogle } from "../services/firebase.service";
import { TOKEN_KEY } from "../services/api.service";
import UserService from "../services/user.service";
import { current } from "@reduxjs/toolkit";

interface UserAuthContextProps {
  user: User;
  signInWithGoogle: () => Promise<void>;
}



const defaultUser: User = {
  emailVerified: false,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: "",
  tenantId: "",
  delete: () => Promise.resolve(),
  getIdToken: () => Promise.resolve(""),
  getIdTokenResult: () => Promise.resolve({} as any),
  reload: () => Promise.resolve(),
  toJSON: () => ({}),
  email: "",
  displayName: "",
  photoURL: "",
  phoneNumber: "",
  providerId: "",
  uid: "",
};

const userAuthContext = createContext<UserAuthContextProps | null>(null);

export function UserAuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(defaultUser);

  useEffect(() => {
    const userService = new UserService();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth", currentUser);
      if (currentUser != null) {
        setUser(currentUser);
        const token = await currentUser?.getIdToken();
        localStorage.setItem(TOKEN_KEY, token || "");
        const userExist: boolean = await userService.checkUserExists(
          currentUser?.email || ""
        );
        if (userExist) {
          console.log("User exists");
        } else {
          console.log("User does not exist");
          await userService.register(
            currentUser?.email || "",
            currentUser?.displayName || ""
          );
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user: user || defaultUser, signInWithGoogle }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
