import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

export default function LinkPreview({ post }) {
  return (
    <>
      {post.link.includes("youtube") ? (
        <PlayerContainer>
          <YoutubePlayer url={post.link} controls={true} width={"100%"} />
          <p>{post.link}</p>
        </PlayerContainer>
      ) : (
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
      )}
    </>
  );
}

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

const PlayerContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const YoutubePlayer = styled(ReactPlayer)`
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;
