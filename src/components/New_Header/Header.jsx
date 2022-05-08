import React, { useState } from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import HeaderButton from "../HeaderButton/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../../features/appSlice";
import logo from "../../icon.png";
export default function Header({ setMessagesClicked, setSearchClicked }) {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const findMessage = (e) => {
    e.preventDefault();
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
        behavior: "smooth",
        block: "center",
      });
      found.parentElement.parentElement.classList.add("message-found");
      setTimeout(() => {
        found.parentElement.parentElement.classList.remove("message-found");
      }, 1000);
      setSearchClicked(false);
    } catch {
      console.log("Not Found! Try Another Keyword");
    }
  };
  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} width={30} alt="logo" />
        <h1
          className="header-logo"
          onClick={() => {
            dispatch(enterRoom({ roomId: 0 }));
          }}
        >
          Slack
        </h1>
      </div>
      <div className="header-middle">
        <form>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="header-search"
            placeholder="Search"
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
      </div>
      <div className="header-right">
        <div className="search-button">
          <HeaderButton setSearchClicked={setSearchClicked} text="search" />
        </div>
        <div className="message-button">
          <HeaderButton setMessagesClicked={setMessagesClicked} text="mail" />
        </div>

        {/* <HeaderButton text="settings" /> */}

        <img
          src={user?.photoURL}
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              auth.signOut();
            }
          }}
          width={46}
          alt={user?.displayName}
          className="header-profile-picture"
        />
      </div>
    </div>
  );
}
