import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import PostEditForm from "./PostEditForm";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function PostEdit({ post, open, handleClose }) {
  const postId = post._id;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Edit posts</Typography>
          <IconButton>
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <Avatar src={post?.author?.avatarUrl} />
            <Stack ml={2}>
              <Link
                variant="subtitle2"
                color="text.primary"
                component={RouterLink}
                sx={{ fontWeight: 600 }}
                to={`user/${post.author._id}`}
              >
                {post?.author?.name}
              </Link>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary" }}
              >
                {fDate(post.createdAt)}
              </Typography>
            </Stack>
          </Box>
        </DialogContent>

        <DialogContent>
          <PostEditForm
            handleClose={handleClose}
            postId={postId}
            editContent={post.content}
            editImage={post.image}
            imageComponent={
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
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostEdit;
