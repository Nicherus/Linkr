import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Form from "../components/LoginPage/Form";
import UserContext from "../contexts/UserContext";

export default function LoginPage() {
  const [formState, setFormState] = useState("login");
  const { token } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (token) history.push("/timeline");
  }, []);

  const handleChangeFormState = () => {
    formState === "login" ? setFormState("signup") : setFormState("login");
  };

  return (
    <MainContainer>
      <LeftContainer>
        <div>
          <LogoTitle>linkr</LogoTitle>
          <Subtitle>
            save, share and discover <br /> the best links on the web
          </Subtitle>
        </div>
      </LeftContainer>
      <RightContainer>
        <Form
          formState={formState}
          handleChangeFormState={handleChangeFormState}
        />
      </RightContainer>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.section`
  width: 65%;
  height: 100%;
  background: var(--backgroundBlack);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
  }
`;

const LogoTitle = styled.h1`
  font-family: var(--fontLogo);
  font-weight: 700;
  font-size: 106px;
  @media (max-width: 768px) {
    font-size: 76px;
  }
`;

const Subtitle = styled.h2`
  font-family: var(--fontOswald);
  font-weight: 700;
  font-size: 43px;
  @media (max-width: 768px) {
    font-size: 23px;
  }
`;

const RightContainer = styled.section`
  width: 35%;
  height: 100%;
  background: var(--backgroundGray);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
  }
`;
