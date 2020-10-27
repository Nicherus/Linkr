import React from "react";
import styled from "styled-components";

import loadingGif from "../../assets/loading.svg";

export default function Spinner() {
  return (
    <ContainerDiv>
      <LoadingImage src={loadingGif} alt="Loading spinner" />
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  margin-top: 100px;
  width: 150px;
`;

const LoadingImage = styled.img`
  width: 100%;
  display: block;
`;
