import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";
import CommentEdit from "./CommentEdit";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const profileId = comment.author._id;
  const { user } = useAuth();
  const userId = user._id;
  const dispatch = useDispatch();

  const [openEditComment, setOpenEditComment] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCommentMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditComment = () => {
    setOpenEditComment(true);
    handleMenuClose();
  };

  const handleCloseEdit = () => {
    setOpenEditComment(false);
  };

  const handleDeleteComment = () => {
    const confirmation = window.confirm("Your action can not be recalled", "");
    if (confirmation)
      dispatch(deleteComment({ commentId: comment._id, postId: comment.post }));
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
        <MenuItem onClick={() => handleEditComment()} sx={{ mx: 1 }}>
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDeleteComment()} sx={{ mx: 1 }}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
          {userId === profileId ? (
            <IconButton onClick={handleCommentMenuOpen}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
          ) : (
            ""
          )}
          {renderMenu}
        </Stack>

        <CommentEdit
          comment={comment}
          open={openEditComment}
          handleClose={handleCloseEdit}
        />

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
