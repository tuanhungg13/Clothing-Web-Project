import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { apiGetBlogs } from "../../service/blogApiService";
import { useNavigate } from "react-router-dom";
const ManageBlog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const [blogs, setBlogs] = useState([])
    const navigation = useNavigate()
    useEffect(() => {
        fetchBlog()
    }, [currentPage])

    const fetchBlog = useCallback(async () => {
        const response = await apiGetBlogs({ sort: "-createdAt", page: currentPage, limit });
        if (response && response.EC === 0) {
            setBlogs(response.DT);
            setTotalPages(response.totalPages);
        }
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    }
    const handleUpdateBlog = (bid) => {
        if (!bid) return
        navigation(`/admin/blog-list/${bid}`)
    }

    return (
        <div className="container mt-3">
            <div className="d-flex flex-wrap">
                {blogs && blogs.length > 0 && blogs.map((item, index) => {
                    return (
                        <div className="d-flex flex-column col-sm-3 col-12 mx-sm-4 mb-5" key={`adm-blog-${index}`}
                            onClick={() => { handleUpdateBlog(item._id) }} style={{ cursor: "pointer" }}>
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
        </div>
    )
}

export default ManageBlog