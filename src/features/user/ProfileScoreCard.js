import { Card, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import { fNumber } from "../../utils/numberFormat";

function ProfileScoreCard({ profile }) {
  const { postCount, friendCount } = profile;

  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(friendCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {friendCount > 1 ? "Friends" : "Friend"}
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(postCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {postCount > 1 ? "Posts" : "Post"}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileScoreCard;
