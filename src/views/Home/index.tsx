"use client";

import { Box, Button } from "@mui/material";
import { selectAuth, setLoading } from "@redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { FC } from "react";

const HomeView: FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  console.log(authState, "authState");
  return (
    <Box>
      <Button variant="contained" onClick={() => dispatch(setLoading(true))}>abc</Button>
    </Box>
  );
};

export default HomeView;
