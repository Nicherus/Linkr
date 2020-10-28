import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import ReactTooltip from "react-tooltip";

import replaceHashOnText from "../../utils/hashtagParser";

export default function SinglePost({ post }) {
  const initialState = post.user.username === "plazzinga_";
  const [isLiked, setIsLiked] = useState(initialState);

  const likePost = async () => {
    setIsLiked(!isLiked);
    try {
    } catch (error) {}
  };

  // const parseTooltipText(post.likes) {
  //   const likeNames = likesArray.map(like => like.name);
  //   let newString = ""
  //   if (isLiked) newString = `[array1], [array2] e outras [array.leght] pessoas`
  //   else newString = `Voce, [array1] e outras [array.leght] pessoas `
  //   return newString;
  // }

  return (
    <PostContainer>
      <UserInfoContainer>
        <Link
          to={{
            pathname: `user/${post.user.id}`,
            state: { userName: post.user.username },
          }}
        >
          <ProfilePicture src={post.user.avatar} alt="profile" />
        </Link>
        <ReactTooltip />
        {isLiked ? (
          <FullHeartIcon onClick={likePost} data-tip="na espera da rota" />
        ) : (
          <EmptyHeartIcon onClick={likePost} data-tip="na espera da rota" />
        )}
      </UserInfoContainer>
      <PostContentContainer>
        <h3>{post.user.username}</h3>
        <p>{replaceHashOnText(post)}</p>
        <PreviewContainer>
          <PreviewInfoContainer>
            <h3>{post.linkTitle}</h3>
            <p>{post.linkDescription}</p>
            <a href={post.link} target="_blank" rel="noreferrer">
              {post.link}
            </a>
          </PreviewInfoContainer>
          <img src={post.linkImage} alt="link preview" />
        </PreviewContainer>
      </PostContentContainer>
    </PostContainer>
  );
}

const PostContainer = styled.article`
  background: var(--backgroundBlack);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  margin-top: 20px;
  width: 100%;
  @media (max-width: 768px) {
    border-radius: 0;
    margin-top: 10px;
  }
`;

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 85%;
  font-family: var(--fontLato);
  word-break: break-all;

  h3 {
    font-size: 19px;
    color: white;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 17px;
    }
  }
  p {
    color: #b7b7b7;
    font-size: 17px;
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 15%;
  margin-right: 10px;
  @media (max-width: 768px) {
    width: 10%;
  }
`;

const EmptyHeartIcon = styled(IoIosHeartEmpty)`
  color: white;
  font-size: 24px;
`;

const FullHeartIcon = styled(IoIosHeart)`
  color: red;
  font-size: 24px;
`;

const ProfilePicture = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #4d4d4d;
  border-radius: 16px;
  height: 155px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  img {
    display: block;
    width: 30%;
    height: 100%;
    object-fit: cover;
  }
`;

const PreviewInfoContainer = styled.div`
  padding: 20px;
  width: 68%;
  h3 {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 11px;
    }
  }
  p {
    font-size: 11px;
    @media (max-width: 768px) {
      font-size: 9px;
    }
  }
  a {
    display: inline-block;
    margin-top: 20px;
    font-size: 11px;
    color: #cecece;
    @media (max-width: 768px) {
      font-size: 9px;
    }
  }
`;
