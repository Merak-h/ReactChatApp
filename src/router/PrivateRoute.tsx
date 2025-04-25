import React, { FC, ReactNode, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useLoginUser } from "../hooks/useLoginUser";

export const PrivateRoute:FC = () => {
  const { loading, account } = useLoginUser();

  if ( loading ) return <Box>読み込み中...</Box>;

  return account ? <Outlet /> : <Navigate to="/" replace />;
};
