import React from "react";
import styled from "styled-components";
export default function ChatMessage({ message, timestamp, user, userImage }) {
  return (
    <MessageContainer id={message.toLowerCase()}>
      <img src={userImage} alt="user-profile" />
      <MessageInfo>
        <h4>
          {user}
          <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <h6>{message}</h6>
      </MessageInfo>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  transition: 0.2s;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 400;
    margin-left: 4px;
    font-size: 10px;
  }
  > h6 {
    font-weight: 400;
    font-size: 16px;
  }
`;
