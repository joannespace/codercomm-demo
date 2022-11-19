import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiService } from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  postById: {},
  currentPagePosts: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      if (state.currentPagePosts % POST_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },

    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload;
      posts.forEach((post) => {
        state.postById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },

    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postById[postId].reactions = reactions;
    },

    resetPosts(state) {
      state.postById = {};
      state.currentPagePosts = [];
    },

    deletePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    editPostsSucess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, image, content } = action.payload;
      console.log("Action payload", action.payload);
      state.postById[postId].content = content;
      state.postById[postId].image = image;
    },
  },
});

//ASYNC ACTIONS
export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/posts", {
        content,
        image: imageUrl,
      });
      dispatch(slice.actions.createPostSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getPosts =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispatch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deletePost =
  ({ postId, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/posts/${postId}`);
      dispatch(slice.actions.deletePostSuccess(response.data));
      dispatch(getPosts({ userId, page: 1, limit: POST_PER_PAGE }));
      toast.success("Post deleted successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const editPost =
  ({ postId, content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.put(`/posts/${postId}`, {
        content,
        image: imageUrl,
      });
      dispatch(slice.actions.editPostsSucess({ ...response.data, postId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const { editPosts } = slice.actions;
export default slice.reducer;
