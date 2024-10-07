import React, { useState } from 'react';
import { MainCard } from "../Components/Card/Card";
import Hero from "../Components/Hero/Hero";
import TextField from '@mui/material/TextField';
import "./main.css";

export const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div>
        <Hero />
      </div>
      <div>
      <div className="search-bar">
        <TextField
          label="Search vacation"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{width:"250px"}}
        />
      </div>
        <MainCard searchQuery={searchQuery} />
      </div>
    </>
  );
};
