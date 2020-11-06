import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { GoLocation } from "react-icons/go";

import UserContext from "../../contexts/UserContext";
import { getLocation } from "../../utils/geolocation";

export default function PostForm({ userPicture, setRefresh, refresh }) {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [activeLocation, setActiveLocation] = useState(false);
  const [geolocation, setGeolocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(UserContext);

  const toggleGeolocation = async () => {
    if (activeLocation) {
      setActiveLocation(false);
      return;
    }

    getLocation(success, (e) => alert(e.message));

    function success(position) {
      setActiveLocation(true);
      setGeolocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }
  };

  const sendPost = async (e) => {
    e.preventDefault();
    if (link.length === 0) {
      alert("Campo de link obrigatorio");
      return;
    }

    setIsLoading(true);
    const post = { link, text };
    if (activeLocation) post.geolocation = geolocation;

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
      setRefresh(!refresh);
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
        <BottomContainer>
          <LocationContainer onClick={toggleGeolocation}>
            <LocationIcon />
            {activeLocation ? (
              <p>Localização ativada</p>
            ) : (
              <p>Localização desativada</p>
            )}
          </LocationContainer>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publicar"}
          </Button>
        </BottomContainer>
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
  @media (max-width: 768px) {
    border-radius: 0;
  }
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
    @media (max-width: 768px) {
      font-size: 17px;
    }
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
    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
`;

const ProfilePicture = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  background: ${(props) => (props.disabled ? "gray" : "#1877F2")};
  border-radius: 5px;
  width: 112px;
  border: none;
  outline: none;
  color: white;
  padding: 5px 10px;
  align-self: flex-end;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    color: #238700;
    font-weight: 300;
    font-size: 13px;
    font-family: var(--fontLato);
  }
`;

const LocationIcon = styled(GoLocation)`
  color: #238700;
  margin-right: 5px;
`;
