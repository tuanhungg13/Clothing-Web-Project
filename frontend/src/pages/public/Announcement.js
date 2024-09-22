import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { apiGetBlogs } from "../../service/blogApiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
const Announcement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const [blogs, setBlogs] = useState([]);
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchBlog()
    }, [currentPage])

    const fetchBlog = useCallback(async () => {
        setLoading(true)
        try {
            const response = await apiGetBlogs({ sort: "-createdAt", page: currentPage, limit });
            if (response && response.EC === 0) {
                setBlogs(response.DT);
                setTotalPages(response.totalPages);
                setLoading(false)
            }
            else {
                setLoading(false)
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
            }
        } catch (error) {
            setLoading(false)
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
        }

    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    }
    const handleReadBlog = (bid) => {
        if (!bid) return
        navigation(`/notification/${bid}`)
    }
    return (
        <div className="container mt-3">
            {loading ? (
                <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                    <Spin size="large" />
                </div>) : (
                <div>
                    <Breadcrumbs />
                    <div className="d-flex flex-wrap mt-4 mx-sm-5 justify-content-center">
                        {blogs && blogs.length > 0 && blogs.map((item, index) => {
                            return (
                                <div className="d-flex flex-column pe-sm-3 mb-5 col-sm-4 col-12" key={`blog-${index}`}
                                    onClick={() => handleReadBlog(item._id)} style={{ cursor: 'pointer' }}>
                                    <img src={item.image} className="w-100" alt="bai-viet" />
                                    <label className="mt-2">{(item.title).toUpperCase()}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="blog-footer mt-2">
                        {totalPages > 1 &&
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        }
                    </div>
                </div>)}
        </div>
    )
}

export default Announcement;