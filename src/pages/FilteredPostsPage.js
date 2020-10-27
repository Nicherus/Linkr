import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import styled from "styled-components";


import Header from "../components/ui/Header";
import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import HashtagsContainer from "../components/TimeLinePage/HashtagsContainer";
import SinglePost from "../components/TimeLinePage/SinglePost";
import Spinner from "../components/common/Spinner";

export default function FilteredPostsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useContext(UserContext); 
  // const token = '2dff901b-4dd4-44cb-8ab6-8d242c00d2d0'; //debugging
  const params = useParams();
  const { state } = useLocation();

  const [posts, setPosts] = useState([]);
  const [hashtag, setHashtag] = useState(params.hashtag);
  const [isMyPosts, setIsMyPosts] = useState(false);

  const offset = 0;
  const limit = 10;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    if(params.id){
      fetchPostsByUser();
    } else if(params.hashtag){
      fetchPostsByTag(false);
    } else{
      setIsMyPosts(true);
      fetchPostsByUser(true);
    }
  }

  const fetchPostsByUser = async (userPost) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userPost? user.id : params.id}/posts?offset=${offset}&limit=${limit}`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      setPosts([...data.posts]);
    } catch (error) {
      console.error(error);
      alert("Houve uma falha ao obter os posts, por favor atualize a página");
    }
    setIsLoading(false);
  };

  const fetchPostsByTag = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${hashtag}/posts?offset=${offset}&limit=${limit}`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
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
        <MainTitle>
          {isMyPosts? 'My Posts' : hashtag? `#${hashtag}` : `${state && state.userName}'s posts`}
        </MainTitle>
        <ContentContainer>
          <PostsSectionContainer>
            {isLoading ? (
              <Spinner />
            ) : posts.length === 0 ? (
              "Nenhum post encontrado"
            ) : (
              posts.map((post) => <SinglePost key={post.id} post={post} />)
            )}
          </PostsSectionContainer>
          <HashtagsContainer token={token}/>
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
