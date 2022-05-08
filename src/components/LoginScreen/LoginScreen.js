import { Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../../firebase";
export default function LoginScreen() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign In</h1>
        <br />
        <p>Join the friendliest community on the planet.</p>
        <Button
          type="submit"
          onClick={signIn}
          endIcon={React.cloneElement(<Person />)}
        >
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
  font-family: "Roboto Mono";
`;
const LoginInnerContainer = styled.div`
  padding: 5%;
  margin: 5%;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #c70039 !important;
    color: white;
    font-family: "Roboto Mono";
  }
`;
