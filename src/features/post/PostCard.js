import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { fDate } from "../../utils/formatTime";
import { Link as RouterLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import useAuth from "../../hooks/useAuth";
import PostEdit from "./PostEdit";

function PostCard({ post }) {
  const profileId = post.author._id;
  const { user } = useAuth();
  const dispatch = useDispatch();

  const userId = user._id;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePostMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = (postId) => {
    handleMenuClose();
    let confirmation = window.confirm("Your action can not be recalled", "");
    if (confirmation) dispatch(deletePost({ postId, userId }));
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleEditPost = (postId) => {
    setOpenEdit(true);
    handleMenuClose();
  };

  const renderMenu = (
    <Box>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDeletePost(post._id)} sx={{ mx: 1 }}>
          Delete
        </MenuItem>

        <MenuItem onClick={() => handleEditPost(post._id)} sx={{ mx: 1 }}>
          Edit
        </MenuItem>
      </Menu>

      <PostEdit post={post} open={openEdit} handleClose={handleClose} />
    </Box>
  );

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<Avatar src={post?.author?.avatarUrl} />}
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          profileId === userId ? (
            <IconButton onClick={handlePostMenuOpen}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
          ) : (
            ""
          )
        }
      />
      {renderMenu}

      <Stack spacing={2} padding={3}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
