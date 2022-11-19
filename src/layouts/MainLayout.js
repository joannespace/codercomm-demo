import { Box, Stack } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <AlertMsg />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
