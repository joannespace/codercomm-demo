import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiService } from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  currentPageUsers: [],
  usersById: {},
  totalPages: 1,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPage } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPage;
    },

    sendFriendRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },

    declineFriendRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },

    acceptFriendRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },

    cancelRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
    },

    removeFriendSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
    },

    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPage } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPage;
    },

    getFriendsRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPage } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPage;
    },

    getRequestsSentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPage } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPage;
    },
  },
});

export const getUsers =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get("/users", { params });
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/friends/requests", {
      to: targetUserId,
    });
    dispatch(
      slice.actions.sendFriendRequestSuccess({ ...response.data, targetUserId })
    );
    toast.success("Request sent");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const declineFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "declined",
    });
    dispatch(
      slice.actions.declineFriendRequestSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Decline sent");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const acceptFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "accepted",
    });
    dispatch(
      slice.actions.acceptFriendRequestSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Request accepted");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const cancelRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(
      `/friends/requests/${targetUserId}`
    );
    dispatch(
      slice.actions.cancelRequestSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Request cancelled");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const removeFriend = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/friends/${targetUserId}`);
    dispatch(
      slice.actions.removeFriendSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Friend removed");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getFriends =
  ({ filterName, page, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends`, { params });
      dispatch(slice.actions.getFriendsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getFriendsRequest =
  ({ filterName, page, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends/requests/incoming`, {
        params,
      });
      dispatch(slice.actions.getFriendsRequestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getRequestsSent =
  ({ filterName, page, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends/requests/outgoing`, {
        params,
      });
      dispatch(slice.actions.getRequestsSentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export default slice.reducer;
