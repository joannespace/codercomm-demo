import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

function SearchInput({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Search by name"
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="search by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
