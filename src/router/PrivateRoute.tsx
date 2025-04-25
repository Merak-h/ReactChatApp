import { FC, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";
import { Loading } from "../components/pages/Loading";

export const PrivateRoute:FC = () => {
  const { loading, account } = useLoginUser();
  const [finishFlag, setFinishFlag] = useState<boolean>(false);

  if ( !finishFlag ) return (
    <Loading loadFinish={!loading} callback={setFinishFlag} />
  );

  return account ? <Outlet /> : <Navigate to="/" replace />;
};
