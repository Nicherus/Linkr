import React, { useState } from "react";
import styled from "styled-components";

import Form from "../components/LoginPage/Form";

export default function LoginPage() {
  const [formState, setFormState] = useState("login");

  const handleChangeFormState = () => {
    formState === "login" ? setFormState("signup") : setFormState("login");
  };

  return (
    <MainContainer>
      <LeftContainer>
        <LogoTitle>linkr</LogoTitle>
        <Subtitle>
          save, share and discover <br /> the best links on the web
        </Subtitle>
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
`;

const LeftContainer = styled.section`
  width: 65%;
  height: 100%;
  background: var(--backgroundBlack);
  padding: 301px 0 0 144px;
`;

const LogoTitle = styled.h1`
  font-family: var(--fontLogo);
  font-weight: 700;
  font-size: 106px;
`;

const Subtitle = styled.h2`
  font-family: var(--fontOswald);
  font-weight: 700;
  font-size: 43px;
`;

const RightContainer = styled.section`
  width: 35%;
  height: 100%;
  background: var(--backgroundGray);
  display: flex;
  justify-content: center;
  align-items: center;
`;
