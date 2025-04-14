import React, { FC, ReactNode, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Box } from "@chakra-ui/react";
import { useLoginUser } from "../hooks/useLoginUser";

export const PrivateRoute:FC = () => {
  const [user, loading] = useAuthState(auth);
  const {loading : noValue} = useLoginUser();
  

  if (loading || noValue) return <Box>読み込み中...</Box>;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};
