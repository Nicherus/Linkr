import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function EditPost({
  text,
  setPostText,
  isEdit,
  setIsEdit,
  postId,
  userToken,
}) {
  const [newText, setNewText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      textareaRef.current.focus();
    }
  }, [isEdit]);

  const updatePostText = async (e) => {
    if (e.keyCode === 27) {
      setNewText(text);
      return;
    }
    if (e.keyCode === 13) {
      setIsLoading(true);
      console.log(userToken);
      try {
        await axios.put(
          `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}`,
          { text: newText },
          { headers: { "user-token": userToken } }
        );
        setPostText(newText);
        setIsLoading(false);
        setIsEdit(!isEdit);
      } catch (error) {
        console.error(error);
        alert("Não foi possível salvar as alterações");
        setIsLoading(false);
      }
    }
  };

  return (
    <EditTextArea
      value={newText}
      onChange={(e) => setNewText(e.target.value)}
      ref={textareaRef}
      onKeyDown={updatePostText}
      disabled={isLoading}
    />
  );
}

const EditTextArea = styled.textarea`
  outline: none;
  border: none;
  border-radius: 7px;
  resize: none;
`;
