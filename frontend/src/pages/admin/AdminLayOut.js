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
            <div className="d-flex">
                <div className="col-2" style={{ border: "1px solid black", height: "600px" }}>
                    <SidebarAdmin />
                </div>

                <div className="col-10" style={{ border: "1px solid red", height: "600px" }}>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default AdminLayOut