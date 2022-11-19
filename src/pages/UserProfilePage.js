import { Card } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Profile from "../features/user/Profile";
import ProfileCover from "../features/user/ProfileCover";
import { getUser } from "../features/user/userSlice";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;

  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card sx={{ mb: 3, height: 280, position: "relative" }}>
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>

          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
