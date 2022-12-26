import {useContext} from "react";
import {createContext, useState} from "react";
import usersService, {getUser, loginUser} from "../Services/userService";

//! createContext create provider & consumer. provider defines what values are provided. consumer gives me the values provided by the provider.

const authContext = createContext(null);
authContext.displayName = "auth-context";

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(getUser());
  const refreshUser = () => setUser(getUser());

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    refreshUser();

    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  return (
    //! provider:
    <authContext.Provider
      value={{user, login, logout, createUser: usersService.createUser}}
    >
      {children}
    </authContext.Provider>
  );
};

//! consumer:
export const useAuth = () => {
  return useContext(authContext);
};

//! useContext is a react hook that get context object and return the value that provide to his provider.
