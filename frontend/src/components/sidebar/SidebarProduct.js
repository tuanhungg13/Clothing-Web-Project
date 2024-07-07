import React, { useEffect, useState } from 'react';
import './SidebarProduct.scss';
import { Slider } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { fetchProductCategories } from "./prodCategorySlice"
const SidebarProduct = (props) => {
    const [priceRange, setPriceRange] = useState([0, 3000000]);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedSize, setSlectedSize] = useState();
    const categories = useSelector(state => state.productCategories.categories)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductCategories());
        console.log("check: ", categories)
    }, []);

    const onChangeSliderRange = (value) => {
        console.log('onChange: ', value);
        setPriceRange(value);
    };

    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleChooseOption = (option) => {
        setSelectedOption(option);
    };

    const handleChooseSize = (size) => {
        setSlectedSize(size);
    }
    return (
        <div className='sidebar-product'>
            <div className="flex-shrink-0 p-3" >
                <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                    <span className="fs-5 fw-semibold mt-1">Danh mục</span>
                </a>
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                            Sản phẩm
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                {categories.map((item, index) => {
                                    return (
                                        <li key={item._id}>
                                            <input type='checkbox' onChange={() => handleChooseOption()} /> {item.categoryName}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </li>
                    <hr />
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            Giá
                        </button>
                        <div className="collapse" id="dashboard-collapse">
                            <div className="slidecontainer">
                                <Slider
                                    className='content-slider'
                                    tooltip={{
                                        open: false
                                    }}
                                    range
                                    min={0}
                                    max={3000000}
                                    draggableTrack // Cho phép kéo thanh slider để chọn khoảng giá
                                    defaultValue={priceRange} // Giá trị mặc định của slider
                                    onChange={onChangeSliderRange} // Hàm được gọi khi slider thay đổi
                                />
                                <div className='price-slider d-flex justify-content-between'>
                                    <div >{formatCurrency(priceRange[0])}đ</div>
                                    <div>{formatCurrency(priceRange[1])}đ</div>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <div>Sắp xếp</div>
                                    <select className="" aria-label="Default select example" style={{ width: '120px' }}>
                                        <option >Mặc định</option>
                                        <option value="1">Giá giảm dần</option>
                                        <option value="2">Giá tăng dần</option>
                                    </select>
                                </div>
                            </div>


                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            </ul>
                        </div>
                    </li>
                    <hr />
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            Kích cỡ
                        </button>
                        <div className="collapse" id="orders-collapse">
                            <ul className="size-product btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <input type='checkbox' checked={selectedSize === 'S'} onChange={() => handleChooseSize('S')} /> S
                                </li>
                                <li>
                                    <input type='checkbox' checked={selectedSize === 'XS'} onChange={() => handleChooseSize('XS')} /> XS
                                </li>
                                <li>
                                    <input type='checkbox' checked={selectedSize === 'M'} onChange={() => handleChooseSize('M')} /> M
                                </li>
                                <li>
                                    <input type='checkbox' checked={selectedSize === 'L'} onChange={() => handleChooseSize('L')} /> L
                                </li>
                                <li>
                                    <input type='checkbox' checked={selectedSize === 'XL'} onChange={() => handleChooseSize('XL')} /> XL
                                </li>
                                <li>
                                    <input type='checkbox' checked={selectedSize === 'XXL'} onChange={() => handleChooseSize('XXL')} /> XXL
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>

        </div>
    )
}

export default SidebarProduct;
