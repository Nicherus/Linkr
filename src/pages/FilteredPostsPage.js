import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import Header from "../components/common/Header";
import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import HashtagsContainer from "../components/TimeLinePage/HashtagsContainer";
import SinglePost from "../components/TimeLinePage/SinglePost";
import Spinner from "../components/common/Spinner";

export default function FilteredPostsPage() {
  const { user, token, fetchUserFollows, userFollows } = useContext(UserContext);
  const { state, pathname } = useLocation();
  const params = useParams();

  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMyPosts, setIsMyPosts] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUserFollows();
    followUnfollow();  
  }, [])

  const fetchPosts = () => {
    if (params.id) {
      fetchPostsByUser();
    } else if (params.hashtag) {
      fetchPostsByTag(false);
    } else if (pathname == "/my-likes") {
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
      if (data.posts.length == 0) {
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
      if (data.posts.length == 0) {
        setHasMore(false);
      }
      setOffset(offset + 10);
      setPosts((oldArray) => [...oldArray, ...data.posts]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPostsMyLikes = async () => {
    try {
      const { data } = await axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked?offset=${offset}&limit=10`,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if (data.posts.length == 0) {
        setHasMore(false);
      }
      setOffset(offset + 10);
      setPosts((oldArray) => [...oldArray, ...data.posts]);
    } catch (error) {
      console.error(error);
    }
  };

  const followUnfollow = () => {
    userFollows.forEach(element => {
      if(element.id == params.id){
        setIsFollowing(true);
      }
    });
  }

  const followUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${params.id}/follow`, null,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if (data) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
      alert("Something happened while trying to follow this user, please try again later");
    }
    setIsLoading(false);
  };

  const unfollowUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${params.id}/unfollow`, null,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      if (data) {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(error);
      alert("Something happened while trying to unfollow this user, please try again layter");
    }
    setIsLoading(false);
  };


  return (
    <>
      <Header />
      <MainContainer>
        <TitleContainer>
          <MainTitle>
            {isMyPosts
              ? "My Posts"
              : params.hashtag
              ? `#${params.hashtag}`
              : pathname == "/my-likes"
              ? "My Likes"
              : `${state && state.userName}'s posts`}
          </MainTitle>
          {( state && state.userName)?
            <Button
              onClick={() => isLoading? null : (isFollowing? unfollowUser() : followUser())} 
              backgroundColor={!isFollowing? 'var(--buttonBlue)' : 'white'}
              color={!isFollowing? 'white' : 'var(--buttonBlue)'}
            >{isFollowing?'unfollow':'follow'}</Button>
          :
            null
          }
        </TitleContainer>
        <ContentContainer>
          <PostsSectionContainer>
            <InfiniteScroll
              loadMore={fetchPosts}
              loader={<Spinner />}
              hasMore={hasMore}
            >
              {posts.length === 0
                ? "No posts found"
                : posts.map((post) => <SinglePost key={post.id} post={post} />)}
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
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 53px 0;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 33px;
    padding: 20px 10px;
    flex-wrap: wrap-reverse;
  }
  @media (max-width: 465px) {
    justify-content: center;
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

const Button = styled.button`
  width: 150px;
  background: ${props => props.backgroundColor};
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 10px 5px;
  color: ${props => props.color};
  font-size: 22px;
  font-family: var(--fontOswald);
  font-weight: 700;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;
