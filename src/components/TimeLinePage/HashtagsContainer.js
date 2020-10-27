import React from "react";
import styled from "styled-components";

export default function HashtagsContainer() {
  return (
    <HashtagsContent>
      <h2>trending</h2>
      <div />
      <ul>
        <li># javascript</li>
        <li># react</li>
        <li># javascript</li>
        <li># react</li>
        <li># javascript</li>
        <li># react</li>
        <li># javascript</li>
        <li># react</li>
        <li># javascript</li>
        <li># react</li>
      </ul>
    </HashtagsContent>
  );
}

const HashtagsContent = styled.section`
  width: 32%;
  height: 100%;
  background: var(--backgroundBlack);
  border-radius: 10px;
  color: white;
  padding: 5px;
  h2 {
    font-family: var(--fontOswald);
    font-weight: bold;
    font-size: 27px;
    margin: 20px 10px;
  }
  div {
    border-top: 1px solid #484848;
    width: 100%;
  }
  ul {
    margin: 20px 10px;
    li {
      margin-bottom: 8px;
      font-family: var(--fontLato);
      font-weight: bold;
      font-size: 19px;
    }
  }
`;
