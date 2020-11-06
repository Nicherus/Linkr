import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {DebounceInput} from 'react-debounce-input';

import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

export default function SearchUserBar() {
  const { token } = useContext(UserContext);


  const [showSearchList, setShowSearchList] = useState(true);
  const [searchList, setSearchList] = useState([]);


  const toggleSearchList = () => {
    setShowSearchList(!showSearchList);
  };


  const searchUsers = async (search) => {
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${search}&offset=0&limit=10`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if(data){
        console.log(data.users)
        setSearchList(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SearchBoxContainer>
        <SearchBox>
          <DebounceInput
            minLength={3}
            debounceTimeout={300} 
            placeholder="Search for people and friends"
            type="text"
            onChange={(e) => searchUsers(e.target.value)}
            onClick={() => toggleSearchList()}
          />
          <IoIosSearch />
        </SearchBox>
        <UserSearchedList 
          showSearchList={showSearchList}
          searchList={searchList}
        />
      </SearchBoxContainer>
    </>
  );
}


function UserSearchedList ({showSearchList, searchList}) {
  return(
    <>
      {showSearchList? 
        searchList.map((user) => (
          <UserSearched
            id={user.id}
            username={user.username}
            avatar={user.avatar}
            isFollowingLoggedUser={user.isFollowingLoggedUser}
          />
        ))
      :
        null
      }
    </>
  );
}


function UserSearched ({ id, username, avatar, isFollowingLoggedUser }) {
  let history = useHistory();
  
  const goToUser = () => {
    history.push({
      pathname: `/user/${id}`,
      state: { userName: username },
    })
  }

  return(
    <UserSearchedContainer
      onClick={() => goToUser()}
    >
      <ProfilePic src={avatar} />
      <h1>{username}</h1>
      {isFollowingLoggedUser ? <h1>following</h1> : null}
    </UserSearchedContainer>
  );
}


const UserSearchedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
  width: 100%;
  height: 70px;
  background: #E7E7E7;
  border-radius: 5px;
  cursor: pointer;

  h1{
    margin-left: 10px;
  }
`;

const ProfilePic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const SearchBoxContainer = styled.div`
  display:flex;
  flex-direction: column;
  padding-top: 7px;
`;

const SearchBox = styled.div`
  display:flex;
  align-items: center;
  width: 450px;
  background: white;
  border-radius: 5px;


  svg{
    height: 40px;
    width: 40px;
  }

  input{
    width: 90%;
    border-radius: 5px;
    background: white;
    border: none;
    outline: none;
    padding: 15px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

