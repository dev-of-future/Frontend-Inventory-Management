'use client'
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import IUser from "../types/user.type";

type UserContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<IUser>();

  const login = (loggedInUser: IUser) => {
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType | undefined => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
