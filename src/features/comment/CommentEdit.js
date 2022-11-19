import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  DialogActions,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { editComment } from "./commentSlice";

function CommentEdit({ comment, open, handleClose }) {
  const [content, setContent] = React.useState(comment.content);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.comment.isLoading);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(editComment({ content, commentId: comment._id }));
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
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
              <Typography variant="h4">Edit comments</Typography>
              <IconButton onClick={handleClose}>
                <HighlightOffIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ display: "flex" }}>
                <Avatar src={comment?.author?.avatarUrl} />
                <Stack ml={2}>
                  <Link
                    variant="subtitle2"
                    color="text.primary"
                    component={RouterLink}
                    sx={{ fontWeight: 600 }}
                    to={`user/${comment.author._id}`}
                  >
                    {comment?.author?.name}
                  </Link>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    {fDate(comment.createdAt)}
                  </Typography>
                </Stack>
              </Box>
            </DialogContent>

            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  fullWidth
                  size="small"
                  value={content}
                  placeholder="Write a comment..."
                  onChange={(event) => setContent(event.target.value)}
                  sx={{
                    position: "relative",
                    "& fieldset": {
                      borderWidth: `1px !important`,
                      borderColor: (theme) =>
                        `${theme.palette.grey[500_32]} !important`,
                    },
                  }}
                />
              </DialogContent>

              <DialogActions sx={{ mx: 2, mb: 2 }}>
                <LoadingButton
                  type="submit"
                  size="small"
                  variant="contained"
                  loading={isLoading}
                >
                  EDIT COMMENT
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </div>
        );
      </Dialog>
    </div>
  );
}

export default CommentEdit;
