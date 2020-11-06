import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import Header from "../components/common/Header";
import UserContext from "../contexts/UserContext";
import HashtagsContainer from "../components/TimeLinePage/HashtagsContainer";
import PostForm from "../components/TimeLinePage/PostForm";
import SinglePost from "../components/TimeLinePage/SinglePost";
import Spinner from "../components/common/Spinner";

export default function TimeLinePage() {
  const { user, token, fetchUserFollows, userFollows } = useContext(UserContext);
  const history = useHistory();

  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    const interval = setInterval(() => {
      setPosts([]);
      setOffset(0);
      setRefresh(false);
    }, 15000)

    if (refresh) {
      setPosts([]);
      setOffset(0)
      setRefresh(false);
    }

    if (!token) {
      history.push("/");
    }

    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    fetchUserFollows();
  }, [])

  const fetchPosts = () => {
    fetchPostsTimeline();
  }

  // const fetchPostsTimeline = async () => {
  //   if (refresh) {
  //     setOffset(0);
  //     setRefresh(false);
  //   }
  //   try {
  //     const { data } = await axios.get(
  //       `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=${offset}&limit=10`,
  //       {
  //         headers: {
  //           "user-token": `${token}`,
  //         },
  //       }
  //     );
  //     if (data.posts.length === 0) {
  //       setHasMore(false);
  //     }
  //     setOffset(offset + 10);
  //     setPosts((oldArray) => [...oldArray, ...data.posts]);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Houve uma falha ao obter os posts, por favor atualize a página");
  //   }
  // };

  const fetchPostsTimeline = async () => {
    if (refresh) {
      setOffset(0);
      setRefresh(false);
    }
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts?offset=${offset}&limit=10`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if (data.posts.length === 0) {
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
        <MainTitle>timeline</MainTitle>
        <ContentContainer>
          <PostsSectionContainer>
            <PostForm
              userPicture={user.avatar}
              setRefresh={setRefresh}
              refresh={refresh}
            />
            {refresh ? (
              <Spinner />
            ) : (
              <InfiniteScroll
                loadMore={fetchPostsTimeline}
                loader={<Spinner />}
                hasMore={hasMore}
              >
                {posts.length === 0
                  ? (userFollows.length > 0)? 'Nenhuma publicação encontrada' : 'Você não segue ninguém ainda, procure por perfis na busca ou na aba explorando c:'
                  : posts.map((post) => (
                      <SinglePost
                        key={post.id}
                        post={post}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
                    ))}
              </InfiniteScroll>
            )}
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
    padding: 0 0 50px 0;
    margin-top: 62px;
  }
`;

const MainTitle = styled.h1`
  font-family: var(--fontOswald);
  font-weight: 700;
  font-size: 43px;
  color: white;
  padding: 53px 0;
  @media (max-width: 768px) {
    padding: 20px 10px;
    font-size: 33px;
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
