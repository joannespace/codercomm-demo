import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiService } from "../../app/apiService";
import { COMMENTS_PER_POST } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
  commentsByPost: {},
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.comments = action.payload;
    },

    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, comments, count, page } = action.payload;
      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.totalCommentsByPost[postId] = count;
      state.currentPageByPost[postId] = page;
    },

    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = reactions;
    },

    editCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, content } = action.payload;
      state.commentsById[commentId].content = content;
    },

    deleteCommentSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createComment =
  ({ content, postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", { content, postId });
      dispatch(slice.actions.createCommentSuccess(response.data));
      dispatch(getComments({ postId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getComments =
  ({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page: page, limit: limit };
      const response = await apiService.get(`posts/${postId}/comments`, {
        params,
      });
      dispatch(
        slice.actions.getCommentsSuccess({ ...response.data, postId, page })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendCommentReaction =
  ({ emoji, commentId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });
      dispatch(
        slice.actions.sendCommentReactionSuccess({
          commentId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const editComment =
  ({ content, commentId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comments/${commentId}`, {
        content,
      });
      dispatch(
        slice.actions.editCommentSuccess({ ...response.data, commentId })
      );
      toast.success("Comment editted successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteComment =
  ({ postId, commentId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/comments/${commentId}`);
      dispatch(getComments({ postId }));
      toast.success("Comment deleted successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export default slice.reducer;
