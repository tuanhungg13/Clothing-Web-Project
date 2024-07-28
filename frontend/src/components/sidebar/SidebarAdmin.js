import React from "react";
import logo from "../../assets/img/logoStore.jpg"
import NavAdmin from "../navigation/NavAdmin";
const SidebarAdmin = () => {
    return (
        <div>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center">
                    <img src={logo} alt="atino" className="w-50 mt-3" />
                </div>
                <div className="mt-3">
                    <NavAdmin />
                </div>

            </div>
        </div>
    )
}

export default SidebarAdmin;