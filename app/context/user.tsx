'use client'
import React, { createContext, useEffect, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import IUser from "../types/user.type";
import TokenService from "../services/token.service";

type UserContextType = {
  user: IUser | undefined;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  login: (loggedInUser: IUser) => void;
  logout: () => void;
};

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>();
  const [token, setToken] = useState<string | undefined>();

  // Todo include/remove setToken
  const login = (loggedInUser: IUser) => {
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(undefined);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = TokenService.getUser();
      setUser(userData);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType | undefined => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
