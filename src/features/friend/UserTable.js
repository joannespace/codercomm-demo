import {
  Avatar,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";
import FriendStatus from "./FriendStatus";

function UserTable({ users }) {
  const { user } = useAuth();
  const currentUserId = user._id;

  const getActionAndStatus = (targetUser) => {
    const props = {
      currentUserId: currentUserId,
      targetUserId: targetUser._id,
      friendship: targetUser.friendship,
    };

    return {
      status: <FriendStatus {...props} />,
      action: <ActionButton {...props} />,
    };
  };
  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                Name
              </TableCell>

              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Email
              </TableCell>

              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Job Title
              </TableCell>

              <TableCell sx={{ display: { xs: "20%", md: "table-cell" } }}>
                Status
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => {
              const { status, action } = getActionAndStatus(user);
              return (
                <TableRow key={user._id} hover>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      alt={user.name}
                      src={user.avatarUrl}
                      sx={{ mr: 2 }}
                    />
                    <Link
                      variant="subtitle2"
                      sx={{ fontWeight: 600 }}
                      component={RouterLink}
                      to={`/user/${user._id}`}
                    >
                      {user.name}
                    </Link>
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.jobTitle}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                    {status}
                  </TableCell>
                  <TableCell align="left">{action}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserTable;
