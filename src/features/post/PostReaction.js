import { IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import ThumbUpRoudedIcon from "@mui/icons-material/ThumbUp";
import ThumbDownRoudedIcon from "@mui/icons-material/ThumbDown";
import { useDispatch } from "react-redux";
import { sendPostReaction } from "./postSlice";

function PostReaction({ post }) {
  const dispatch = useDispatch();
  const handleClick = (emoji) => {
    dispatch(sendPostReaction({ postId: post._id, emoji }));
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpRoudedIcon sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.like}
      </Typography>

      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownRoudedIcon sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.dislike}
      </Typography>
    </Stack>
  );
}

export default PostReaction;
