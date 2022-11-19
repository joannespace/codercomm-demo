import React, { useState } from "react";
import { Box, Container } from "@mui/system";
import { Tab, Tabs, Typography } from "@mui/material";
import { capitalCase } from "change-case";
import RequestWaiting from "./RequestWaiting";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import RequestSent from "./RequestSent";

function RequestTab() {
  const [currentTab, setCurrentTab] = useState("friends_request");

  const FRIEND_TABS = [
    {
      value: "friends_request",
      icon: <CallReceivedIcon sx={{ fontSize: 30 }} />,
      component: <RequestWaiting />,
    },
    {
      value: "request_sent",
      icon: <ForwardToInboxIcon sx={{ fontSize: 30 }} />,
      component: <RequestSent />,
    },
  ];
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Friends Rquest
      </Typography>

      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {FRIEND_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      <Box sx={{ mb: 5 }}>
        {FRIEND_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && tab.component;
        })}
      </Box>
    </Container>
  );
}

export default RequestTab;
