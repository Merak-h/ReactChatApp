import { Page404 } from "../components/pages/Page404";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagemen";
import { FC, memo } from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "../components/templates/DashboardLayout";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "../components/pages/Profile";

export const Router:FC = memo(()=>{
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/setting/profile" element={<Profile />} />
                <Route path="/setting" element={<Setting />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/:id" element={<Home />} />
                    <Route path="/user" element={<UserManagement />} />
                </Route>
                <Route path="*" element={<Page404/>} />
            </Route>
        </Routes>
    );
});