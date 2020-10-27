import React from "react";
import styled from "styled-components";

export default function SinglePost({ post }) {
  return (
    <PostContainer>
      <ProfilePicture src={post.user.avatar} alt="profile" />
      <PostContentContainer>
        <h3>{post.user.username}</h3>
        <p>{post.text}</p>
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
`;

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  font-family: var(--fontLato);
  h3 {
    font-size: 19px;
    color: white;
    margin-bottom: 10px;
  }
  p {
    color: #cecece;
    font-size: 17px;
  }
`;

const ProfilePicture = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const PreviewInfoContainer = styled.div`
  padding: 20px;
  h3 {
    font-size: 16px;
  }
  p {
    font-size: 11px;
  }
  a {
    display: inline-block;
    margin-top: 20px;
    font-size: 11px;
    color: #cecece;
  }
`;

const PreviewContainer = styled.div`
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
  }
`;
