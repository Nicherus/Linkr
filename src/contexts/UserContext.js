import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();
export default UserContext;

export const UserContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const signUp = async (body) => {
    try {
      const { data } = await axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up`,
        body
      );
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        return data;
      }
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  };

  const signIn = async (body) => {
    try {
      const { data } = await axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in`,
        body
      );
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        return data;
      }
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  };


  const clearData = () => {
    setUser({});
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        signIn,
        signUp,
        user,
        clearData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
