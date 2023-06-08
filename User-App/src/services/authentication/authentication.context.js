import React, {useState, createContext, useRef} from "react";

import {
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";

import {loginRequest} from "./authentication.service";
import {createUserWithEmailAndPassword} from "./createuser";


export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = useRef(getAuth()).current;

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr.json());
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((u) => {
        if(u.errors != undefined){
        setError(u.errors)
        console.log(u.errors)
        setIsLoading(true);
      }
      else{
        setUser(u);
        setIsLoading(false);
      }
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (name, username, email, password, repeatedPassword, phoneNumber,lat,  long, address) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(name, username, email, password, repeatedPassword, phoneNumber,lat,  long, address)
      .then((u) => {
        setUser(u);
        if(user.errors == undefined){
          setIsLoading(false);
        }
        else{
          setError(user.errors.toString())
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
      AsyncStorage.clear();
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
