import React from "react";
import styled from "styled-components";
import { FiberManualRecord, Create, Add } from "@material-ui/icons";
import { auth, db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

import SidebarOption from "./SidebarOption";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Sidebar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Test Mode</h2>
          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption addChannelOption Icon={Add} title="Add Channel" />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #c70039;
  max-width: 260px;
  margin-top: 70px;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #c70039;
  }
  @media (max-width: 765px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #c70039;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #c70039;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
