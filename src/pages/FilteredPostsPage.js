import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroller'; 


import Header from "../components/ui/Header";
import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import HashtagsContainer from "../components/TimeLinePage/HashtagsContainer";
import SinglePost from "../components/TimeLinePage/SinglePost";
import Spinner from "../components/common/Spinner";

export default function FilteredPostsPage() {
  const { user, token } = useContext(UserContext);
  const { state } = useLocation();
  const params = useParams();

  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMyPosts, setIsMyPosts] = useState(false);


  const fetchPosts = () => {
    if (params.id) {
      fetchPostsByUser();
    } else if (params.hashtag) {
      fetchPostsByTag(false);
    } else if (state.isMyLikes) {
      fetchPostsMyLikes();
    } else {
      setIsMyPosts(true);
      fetchPostsByUser(true);
    }
  };

  const fetchPostsByUser = async (userPost) => {
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${
          userPost ? user.id : params.id
        }/posts?offset=${offset}&limit=10`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if(data.posts.length == 0){
        setHasMore(false);
      }
      setOffset(offset + 10);
      setPosts((oldArray) => [...oldArray, ...data.posts]);
    } catch (error) {
      console.error(error);
      alert("Houve uma falha ao obter os posts, por favor atualize a página");
    }
  };

  const fetchPostsByTag = async () => {
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${params.hashtag}/posts?offset=${offset}&limit=10`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if(data.posts.length == 0){
        setHasMore(false);
      }
      setOffset(offset + 10);
      setPosts((oldArray) => [...oldArray, ...data.posts]);
    } catch (error) {
      console.error(error);
      alert("Houve uma falha ao obter os posts, por favor atualize a página");
    }
  };

  const fetchPostsMyLikes = async () => { //MUDAR esperando endpoint my-likes
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${user.id}/posts?offset=${offset}&limit=10`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if(data.posts.length == 0){
        setHasMore(false);
      }
      setOffset(offset + 10);
      setPosts((oldArray) => [...oldArray, ...data.posts]);
    } catch (error) {
      console.error(error);
      alert("Houve uma falha ao obter os posts, por favor atualize a página");
    }
  };


  return (
    <>
      <Header />
      <MainContainer>
        <MainTitle>
          {isMyPosts
            ? "My Posts"
            : params.hashtag
            ? `#${params.hashtag}`
            : `${state && state.userName}'s posts`}
        </MainTitle>
        <ContentContainer>
          <PostsSectionContainer>
            <InfiniteScroll
              loadMore={fetchPosts}
              loader={<Spinner />}
              hasMore={hasMore}
            >
              {(posts.length === 0)? 
                "Nenhum post encontrado"
              :
                posts.map((post) => <SinglePost key={post.id} post={post} />)
              }
            </InfiniteScroll>
          </PostsSectionContainer>
          <HashtagsContainer token={token} />
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
  @media (max-width: 768px) {
    margin-top: 62px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MainTitle = styled.h1`
  font-family: var(--fontOswald);
  font-weight: 700;
  font-size: 43px;
  color: white;
  padding: 53px 0;
  @media (max-width: 768px) {
    font-size: 33px;
    padding: 20px 0;
  }
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;
