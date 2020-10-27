import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Header from "../components/ui/Header";
import UserContext from "../contexts/UserContext";
import HashtagsContainer from "../components/TimeLinePage/HashtagsContainer";
import PostForm from "../components/TimeLinePage/PostForm";
import SinglePost from "../components/TimeLinePage/SinglePost";
import Spinner from "../components/common/Spinner";

export default function TimeLinePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useContext(UserContext);

  useEffect(() => {
    fetchPostsTimeline();
  }, []);

  const fetchPostsTimeline = async () => {
    let offset = 0;
    let limit = 10;
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=${offset}&limit=${limit}`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      console.log(data);
      setPosts([...data.posts]);
    } catch (error) {
      console.error(error);
      alert("Houve uma falha ao obter os posts, por favor atualize a página");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <MainContainer>
        <MainTitle>timeline</MainTitle>
        <ContentContainer>
          <PostsSectionContainer>
            <PostForm userPicture={user.avatar} />
            {isLoading ? (
              <Spinner />
            ) : posts.length === 0 ? (
              "Nenhum post encontrado"
            ) : (
              posts.map((post) => <SinglePost key={post.id} post={post} />)
            )}
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
  height: calc(100% - 80px);
  min-height: 100vh;
  padding: 0 15%;
  padding-bottom: 50px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
