import React from "react";
import "./Button.css";
import { AccountCircle, Settings, Mail, Search } from "@material-ui/icons";
export default function Button(props) {
  return (
    <div
      onClick={() => {
        if (props.setMessagesClicked) {
          props?.setMessagesClicked(true);
        }
        if (props.setSearchClicked) {
          props?.setSearchClicked(true);
        }
      }}
      className="circular-button"
    >
      {props.text === "account" ? (
        <AccountCircle
          color="inherit"
          fontSize="inherit"
          style={{ fontSize: 28 }}
        />
      ) : null}
      {props.text === "settings" ? (
        <Settings color="inherit" fontSize="inherit" style={{ fontSize: 28 }} />
      ) : null}
      {props.text === "mail" ? (
        <Mail color="inherit" fontSize="inherit" style={{ fontSize: 28 }} />
      ) : null}
      {props.text === "search" ? (
        <Search color="inherit" fontSize="inherit" style={{ fontSize: 28 }} />
      ) : null}
    </div>
  );
}
