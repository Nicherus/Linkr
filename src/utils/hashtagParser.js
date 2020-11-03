import styled from "styled-components";
import { Link } from "react-router-dom";

const replaceHashOnText = (postText) => {
  return postText.split(" ").map((word, i) => {
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

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
`;

export default replaceHashOnText;
