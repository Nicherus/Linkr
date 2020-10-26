import React, { useState } from "react";
import styled from "styled-components";

export default function Form({ formState, handleChangeFormState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const sendLoginInfo = (e) => {
    e.preventDefault();
    console.log("Logging in");
  };

  const registerUser = (e) => {
    e.preventDefault();
    console.log("registering");
  };

  const login = formState === "login";

  return (
    <FormContainer onSubmit={login ? sendLoginInfo : registerUser}>
      <input
        placeholder="e-mail"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {!login && (
        <>
          <input
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            placeholder="picture url"
            type="url"
            onChange={(e) => setPictureUrl(e.target.value)}
            value={pictureUrl}
          />
        </>
      )}
      <Button type="submit">{login ? "Log In" : "Sign Up"}</Button>
      <ChangeFormButton onClick={handleChangeFormState}>
        {login ? "First time? Create an account!" : "Switch back to log in"}
      </ChangeFormButton>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  input {
    width: 100%;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 20px 10px;
    margin-bottom: 10px;
  }
  input::placeholder {
    color: #9f9f9f;
    font-weight: 700;
    font-size: 27px;
  }
`;

const Button = styled.button`
  width: 100%;
  background: var(--buttonBlue);
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 15px 5px;
  color: white;
  font-size: 27px;
  font-family: var(--fontOswald);
  font-weight: 700;
`;

const ChangeFormButton = styled.p`
  text-decoration: underline;
  font-family: var(--fontLato);
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
`;
