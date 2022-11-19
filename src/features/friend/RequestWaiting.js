import { Card, Grid, Pagination, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import { getFriendsRequest } from "./friendSlice";
import UserCard from "./UserCard";

function RequestWaiting() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);

  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsRequest({ filterName, page }));
  }, [dispatch, filterName, page]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default RequestWaiting;
