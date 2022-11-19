import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/comment/commentSlice";
import postReducer from "../features/post/postSlice";
import friendReducer from "../features/friend/friendSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = {
  comment: commentReducer,
  post: postReducer,
  friend: friendReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
