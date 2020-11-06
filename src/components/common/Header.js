import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SearchUserBar from './SearchUsersBar'

export default function Header() {
  const { user, clearData } = useContext(UserContext);
  let history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToMyPosts = () => {
    history.push("/my-posts");
  };

  const goToMyLikes = () => {
    history.push({ 
      pathname: '/my-likes', 
      state: { isMyLikes: true } 
    });
  };

  const goToExplore = () => {
    history.push("/explore");
  };

  const logout = () => {
    history.push("/");
    clearData();
  };

  return (
    <HeaderContainer>
      <Link to="/timeline">
        <LogoTitle>linkr</LogoTitle>
      </Link>
      <SearchUserBar />
      <HeaderMenu>
        {showMenu ? (
          <Button onClick={() => toggleMenu()}>
            <IconFoward />
          </Button>
        ) : (
          <Button onClick={() => toggleMenu()}>
            <IconBack />
          </Button>
        )}
        <ProfilePic draggable={false} src={user.avatar} />
        <MenuOptions show={showMenu}>
          <Link onClick={() => goToMyPosts()}>My posts</Link>
          <Link onClick={() => goToMyLikes()}>My likes</Link>
          <Link onClick={() => goToExplore()}>Explore</Link>
          <Link onClick={() => logout()}>Logout</Link>
        </MenuOptions>
      </HeaderMenu>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100vw;
  background: var(--backgroundBlack);
  padding: 5px 10px;
  @media (max-width: 768px) {
    height: 62px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 165px;
  height: 100%;
`;

const MenuOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  height: 150px;
  width: 200px;
  margin-top: 80px;
  position: fixed;
  top: 0px;
  right: ${(props) =>
    props.show ? 0 : "calc(100vw * (-1))"}; // zero quando for mostrar
  z-index: 2;
  transition: 300ms all;
  background: var(--backgroundBlack);
  border-bottom-left-radius: 35px;
  @media (max-width: 768px) {
    margin-top: 62px;
    width: 100px;
    height: 80px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  a {
    color: #ffffff;
    font-family: var(--fontLato);
    font-size: 26px;
    cursor: pointer;
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
`;

const LogoTitle = styled.h1`
  font-family: var(--fontLogo);
  font-weight: 700;
  font-size: 70px;
  color: #ffffff;
  margin-left: 10px;
  @media (max-width: 768px) {
    font-size: 45px;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const ProfilePic = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 44px;
    width: 44px;
  }
`;

const IconBack = styled(IoIosArrowBack)`
  color: white;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const IconFoward = styled(IoIosArrowForward)`
  color: white;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;
