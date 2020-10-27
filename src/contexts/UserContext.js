import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();
export default UserContext;

export const UserContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(2);
  const [selectedId, setSelectedId] = useState(1);
  const [hashtag, setHashtag] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

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

  const getPostsTimeline = async (body) => {
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=${offset}&limit=${limit}`,
        body,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  };

  const getPostsByUser = async (body) => {
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${selectedId}/posts?offset=${offset}&limit=${limit}`,
        body,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  };

  const getPostsByHashtag = async (body) => {
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/:${hashtag}/posts?offset=${offset}&limit=${limit}`,
        body,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if (data) {
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
    setPosts({});
  };

  return (
    <UserContext.Provider
      value={{
        token,
        signIn,
        signUp,
        user,
        getPostsTimeline,
        getPostsByUser,
        getPostsByHashtag,
        clearData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
