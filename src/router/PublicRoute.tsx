import { useLoginUser } from "../hooks/useLoginUser";
import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";

export const PublicRoute:FC = () => {
  const { account, loading } = useLoginUser();

  if (loading) return <div>読み込み中...</div>;

  return account ? <Navigate to="/home" replace /> : <Outlet />;
};