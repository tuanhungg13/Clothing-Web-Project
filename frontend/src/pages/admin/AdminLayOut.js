import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
const AdminLayOut = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current || current.role !== "admin") return (<Navigate to={"/"} />)
    return (
        <div className="">
            <div className="d-flex row mx-0">
                <div className="col-sm-2 mt-3">
                    <SidebarAdmin />
                </div>

                <div className="col-sm-10 pt-3" style={{ marginTop: "5px" }}>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default AdminLayOut