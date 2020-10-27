import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import styled from "styled-components";

export default function Form({ formState, handleChangeFormState }) {
  const {signIn, signUp} = useContext(UserContext);
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const sendLoginInfo = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = await signIn({
      'email': email,
      'password': password,
    })

    if(data){
      console.log(data);
      history.push('/timeline');
    } else{
      alert('Ops! Não foi possível logar no momento, verifique seus dados e/ou tente novamente mais tarde.');
    }
    setLoading(false);
  };

  const registerUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = await signUp({
      'email': email,
      'password': password,
      'username': username,
      'pictureUrl': pictureUrl,
    })

    if(data){
      console.log(data);
      history.push('/timeline');
    } else{
      alert('Ops! Não foi possível cadastrar um usuário no momento, verifique seus dados e/ou tente novamente mais tarde.');
    }
    setLoading(false);
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
      <Button disabled={loading} type="submit">{login ? "Log In" : "Sign Up"}</Button>
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
