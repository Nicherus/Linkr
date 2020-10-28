import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SinglePost({ post }) {
  const replaceHashOnText = (post) => {
    return post.text.split(" ").map((word, i) => {
      if (word.charAt(0) === "#") {
        const wordMinusHash = word.slice(1);
        if (word.includes(",")) {
          const newWordArr = word.split(",");
          return newWordArr.map((word, j) => (
            <StyledLink key={j} to={`/hashtag/${word.slice(1)}`}>
              {" "}
              {word}
            </StyledLink>
          ));
        }
        if (wordMinusHash.includes("#")) {
          const newWordArr = word.split("#");
          return newWordArr.map((word, k) => (
            <StyledLink key={k} to={`/hashtag/${word}`}>
              {" "}
              #{word}
            </StyledLink>
          ));
        }
        return (
          <StyledLink key={i} to={`/hashtag/${word.slice(1)}`}>
            {" "}
            {word}
          </StyledLink>
        );
      }
      return ` ${word} `;
    });
  };

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
  width: 15%;
  @media (max-width: 768px) {
    width: 10%;
  }
`;

const ProfilePicture = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
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

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
`;
