import { useLoginUser } from "../hooks/useLoginUser";
import { Navigate, Outlet } from "react-router-dom";
import { FC, useState } from "react";
import { Loading } from "../components/pages/Loading";

export const PublicRoute:FC = () => {
  const { account, loading } = useLoginUser();
    const [finishFlag, setFinishFlag] = useState<boolean>(false);

    if ( !finishFlag ) return (
      <Loading loadFinish={!loading} callback={setFinishFlag} />
    );

  return account ? <Navigate to="/home" replace /> : <Outlet />;
};