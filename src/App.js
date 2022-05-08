import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewHeader from "./components/New_Header/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "./features/appSlice";
import { useCollection } from "react-firebase-hooks/firestore";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import Spinner from "react-spinkit";
import { Add, Search } from "@material-ui/icons";
import { Button } from "@material-ui/core";
function App() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const [channels] = useCollection(db.collection("rooms"));
  const [isMessagesClicked, setMessagesClicked] = useState(false);
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };
  const findMessage = (e) => {
    e?.preventDefault();
    try {
      var paragraphs = document.getElementsByTagName("h6");
      let found;
      for (var i = 0; i < paragraphs.length; i++) {
        if (
          paragraphs[i].innerHTML
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          found = paragraphs[i];
        }
      }
      found.scrollIntoView({
        behavior: "auto",
        block: "center",
      });

      found.parentElement.parentElement.classList.add("message-found");
      setTimeout(() => {
        found.parentElement.parentElement.classList.remove("message-found");
      }, 1000);
      setSearchClicked(false);
    } catch {
      document.getElementById("find-message").innerText =
        "Not Found! Try Another Keyword";
    }
    setSearchValue("");
  };
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />
          <Spinner name="folding-cube" color="#900c3e" />
        </AppLoadingContents>
      </AppLoading>
    );
  }
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <>
            <NewHeader
              setSearchClicked={setSearchClicked}
              setMessagesClicked={setMessagesClicked}
            />
            <AppBody>
              {isMessagesClicked && (
                <ModalWindow>
                  <ModalWindowBackground
                    onClick={() => {
                      setMessagesClicked(!isMessagesClicked);
                    }}
                  ></ModalWindowBackground>
                  <ModalWindowBody>
                    <h1>Select a channel</h1>
                    {channels?.docs.map((doc) => (
                      <ChannelButton
                        key={doc.id}
                        id={doc.id}
                        onClick={() => {
                          dispatch(
                            enterRoom({
                              roomId: doc.id,
                            })
                          );
                          setMessagesClicked(!isMessagesClicked);
                        }}
                      >
                        {doc.data().name}
                      </ChannelButton>
                    ))}
                    <ChannelButtonCreate onClick={addChannel}>
                      Create Channel <Add />
                    </ChannelButtonCreate>
                  </ModalWindowBody>
                </ModalWindow>
              )}
              {isSearchClicked && (
                <ModalWindow>
                  <ModalWindowBackground
                    onClick={() => {
                      setSearchClicked(!isSearchClicked);
                    }}
                  ></ModalWindowBackground>
                  <ModalWindowBody>
                    <h1>Find</h1>
                    <p id="find-message">
                      Enter the keyword you want to look up
                    </p>
                    <br />
                    <form>
                      <ModalWindowInput
                        autoFocus
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                        type="text"
                      />
                      <Button
                        style={{ display: "none" }}
                        hidden
                        type="submit"
                        onClick={findMessage}
                      >
                        SEND
                      </Button>
                    </form>

                    <ChannelButtonCreate onClick={() => findMessage()}>
                      Search <Search />
                    </ChannelButtonCreate>
                  </ModalWindowBody>
                </ModalWindow>
              )}
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
const ModalWindowBackground = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.2;
  z-index: 1000;
`;
const ModalWindowInput = styled.input`
  background-color: #ececec;
  border-radius: 5px;
  width: 100%;
  border: none;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline: none;
  text-indent: 10px;
  font-size: 18px;
`;
const ChannelButton = styled.div`
  background-color: #ececec;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ChannelButtonCreate = styled.div`
  background-color: #900c3e;
  border: 2px solid #c70039;
  border-radius: 5px;
  display: flex;
  width: 100%;
  height: 40px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;
const ModalWindow = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalWindowBody = styled.div`
  background-color: white;
  padding: 20px 50px 100px 50px;
  width: 50vw;
  position: fixed;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  z-index: 10000;
  font-family: "Roboto Mono";
  @media (max-width: 390px) {
    > h1 {
      font-size: 18px;
    }
  }
`;
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
