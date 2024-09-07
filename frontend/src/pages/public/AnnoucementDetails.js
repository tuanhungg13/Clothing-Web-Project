import React, { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import { NavLink, useParams } from "react-router-dom";
import { apiGetBlogDetails } from "../../service/blogApiService";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
const AnnouncementDetails = () => {
    const [blogDetails, setBlogDetails] = useState({});
    const params = useParams();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchBlogDetails()
    }, [])
    const navigation = useNavigate()
    const fetchBlogDetails = async () => {
        setLoading(true)
        try {
            const response = await apiGetBlogDetails(params.bid)
            if (response && response.EC === 0) {
                setBlogDetails(response.DT)
                toast.success(response.DT)
                setLoading(false)
            }
            else {
                toast.error(response.EM)
                setLoading(false)
                navigation("/notification")
            }
        } catch (error) {
            setLoading(false)
            toast.error("Có lỗi xảy ra vui lòng thử lại!")
        }
    }
    const ContentDisplay = ({ content }) => {
        const cleanContent = DOMPurify.sanitize(content); // Làm sạch nội dung HTML

        return (
            <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        );
    }
    return (
        <div className="container">
            {loading ? (
                <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                    <Spin size="large" />
                </div>) : (
                <div>

                    <div className="mt-3 mb-3">
                        {/* <button className="btn"><IoIosReturnLeft style={{ fontSize: "30px" }} /></button> */}
                        <NavLink to={"/"} className={"text-dark text-decoration-none"}><IoHomeOutline className="mb-1" /> Trang chủ / </NavLink>
                        <NavLink to={"/notification"} className={"text-dark text-decoration-none"}>Thông báo /</NavLink>
                        <NavLink to={`/notification/${params.bid}`} className={"text-dark text-decoration-none"}>{blogDetails.title}</NavLink>
                    </div>
                    <img src={blogDetails?.image || ""} alt={blogDetails.title} style={{ width: "100%", height: "60vh" }} className="mb-3" />
                    <ContentDisplay content={blogDetails.description} />
                </div>
            )}
        </div>
    )
}
export default AnnouncementDetails