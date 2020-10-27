import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function PostForm({ userPicture }) {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(UserContext);

  const sendPost = async (e) => {
    e.preventDefault();
    if (link.length === 0) {
      alert("Campo de link obrigatorio");
      return;
    }
    setIsLoading(true);
    const post = { link, text };

    try {
      await axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts`,
        post,
        {
          headers: {
            "user-token": `${token}`,
          },
        }
      );
      console.log("enviado com sucesso");
      setLink("");
      setText("");
    } catch (error) {
      alert("Houve um erro ao publicar seu link");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <PublishPostContainer>
      <ProfilePicture src={userPicture} alt="profile" />
      <PostFormContainer onSubmit={sendPost}>
        <h3>O que voce tem pra favoritar hoje?</h3>
        <input
          placeholder="http://..."
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled={isLoading}
        />
        <textarea
          rows="3"
          placeholder="Muito irado esse link falando de #javascript"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Publishing..." : "Publicar"}
        </Button>
      </PostFormContainer>
    </PublishPostContainer>
  );
}

const PublishPostContainer = styled.section`
  width: 100%;
  background: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  margin-bottom: 10px;
`;

const PostFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  h3 {
    font-family: var(--fontLato);
    font-size: 20px;
    font-weight: 300;
    color: #707070;
    margin-bottom: 8px;
  }
  input,
  textarea {
    width: 100%;
    background: #efefef;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-bottom: 8px;
    padding: 5px;
  }
  textarea {
    resize: none;
  }
  input::placeholder,
  textarea::placeholder {
    font-family: var(--fontLato);
    font-weight: 300;
    font-size: 15px;
  }
`;

const ProfilePicture = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const Button = styled.button`
  background: var(--buttonBlue);
  border-radius: 5px;
  width: 112px;
  border: none;
  outline: none;
  color: white;
  padding: 5px 10px;
  align-self: flex-end;
  cursor: pointer;
`;
