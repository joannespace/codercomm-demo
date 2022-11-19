import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import useAuth from "../../hooks/useAuth";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";
import ProfileAbout from "./ProfileAbout";
import ProfileScoreCard from "./ProfileScoreCard";
import ProfileSocialInfo from "./ProfileSocialInfo";

function Profile({ profile }) {
  const { user } = useAuth();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScoreCard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {user._id === profile._id && <PostForm />}
          <PostList userId={profile._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
