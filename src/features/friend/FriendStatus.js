import React from "react";
import { Chip } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";

function FriendStatus({ currentUserId, targetUserId, friendship, sx }) {
  if (currentUserId === targetUserId) return null;

  if (!friendship) return null;

  if (friendship.status === "accepted") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<CheckCircleRoundedIcon />}
        label="Friend"
        color="success"
      />
    );
  }

  if (friendship.status === "declined") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<DoNotDisturbAltRoundedIcon />}
        label="Declined"
        color="error"
      />
    );
  }

  if (friendship.status === "pending") {
    const { from, to } = friendship;

    if (from === currentUserId && to === targetUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<MarkEmailReadRoundedIcon />}
          label="Request sent"
          color="warning"
        />
      );
    } else if (from === targetUserId && to === currentUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<PauseCircleOutlineRoundedIcon />}
          label="Waiting for response"
          color="warning"
        />
      );
    }
  }
}

export default FriendStatus;
