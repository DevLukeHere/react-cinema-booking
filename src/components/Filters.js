import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function Filters(props) {
  const { filters, onChangeFilters } = props;

  return (
    <Box sx={{ minWidth: 120, margin: "1rem 0" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort Movies</InputLabel>
        <NativeSelect
          id="movie-filter-select"
          value={filters}
          label="Filters"
          onChange={(e) => onChangeFilters(e.target.value)}
          defaultValue={"release_date.desc"}
        >
          <option value={"release_date.desc"}>
            Release Date (Newest to Oldest)
          </option>
          <option value={"original_title.asc"}>Title (a - Z)</option>
          <option value={"original_title.desc"}>Title (Z - a)</option>
          <option value={"vote_average.asc"}>Rating (Lowest to Highest)</option>
          <option value={"vote_average.desc"}>
            Rating (Highest to Lowest)
          </option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
