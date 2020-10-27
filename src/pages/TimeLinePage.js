import React, { useContext } from "react";
import styled from "styled-components";

import Header from "../components/ui/Header";
import UserContext from "../contexts/UserContext";
import HashtagsContainer from "../components/TimeLinePage/HashtagsContainer";
import PostForm from "../components/TimeLinePage/PostForm";

export default function TimeLinePage() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Header />
      <MainContainer>
        <MainTitle>timeline</MainTitle>
        <ContentContainer>
          <PostsSectionContainer>
            <PostForm userPicture={user.avatar} />
            <PostsContainer></PostsContainer>
          </PostsSectionContainer>
          <HashtagsContainer />
        </ContentContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  margin-top: 80px;
  background: var(--backgroundGray);
  height: calc(100vh - 80px);
  padding: 0 15%;
`;

const MainTitle = styled.h1`
  font-family: var(--fontOswald);
  font-weight: 700;
  font-size: 43px;
  color: white;
  padding: 53px 0;
`;

const ContentContainer = styled.section`
  display: flex;
  justify-content: space-between;
`;

const PostsSectionContainer = styled.section`
  width: 66%;
`;

const PostsContainer = styled.section``;
