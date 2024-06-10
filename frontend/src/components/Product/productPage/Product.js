import React, { useEffect, useState } from 'react';
import './Product.scss';
import data from '../../../data/data.json';
import { Slider } from 'antd';
import { IoMdArrowDropright } from "react-icons/io";
import { FaHome } from "react-icons/fa";


const Product = (props) => {
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 3000000]);
    const [selectedOption, setSelectedOption] = useState()
    const [selectedSize, setSlectedSize] = useState();

    useEffect(() => {
        setProducts(data.products);
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
        <>
            <div className='product-page container'>

                <div className='row'>
                    <div className='nav-title' style={{ marginTop: '-10px', fontSize: '14px' }}>
                        <FaHome className='mb-1' /> Trang chủ <IoMdArrowDropright />Sản phẩm
                    </div>
                    <div className='content-left col-3'>
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
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'ao-phong'} onChange={() => handleChooseOption('ao-phong')} /> Áo phông
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'ao-so-mi'} onChange={() => handleChooseOption('ao-so-mi')} /> Áo sơ mi
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'ao-hoodie'} onChange={() => handleChooseOption('ao-hoodie')} /> Áo hoodie
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'ao-sweater'} onChange={() => handleChooseOption('ao-sweater')} /> Áo sweater
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'ao-mangto'} onChange={() => handleChooseOption('ao-mangto')} /> Áo măng tô
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'ao-len'} onChange={() => handleChooseOption('ao-len')} /> Áo len
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'quan-jeans'} onChange={() => handleChooseOption('quan-jeans')} /> Quần jeans
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'quan-au'} onChange={() => handleChooseOption('quan-au')} /> Quần âu
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'quan-short'} onChange={() => handleChooseOption('quan-short')} /> Quần short
                                            </li>
                                            <li>
                                                <input type='checkbox' checked={selectedOption === 'quan-tui-hop'} onChange={() => handleChooseOption('quan-tui-hop')} /> Quần túi hộp
                                            </li>

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
                                                tooltipVisible={false}
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

                    <div className='content-right col-9'>
                        <div className='topbar-product d-flex justify-content-between'>
                            <div className='d-flex'>
                                <span className='d-flex'>Bạn đang xem: </span>
                                <span className='category ms-3 text-uppercase '>Sản phẩm</span>
                            </div>

                            <select className="" aria-label="Default select example">
                                <option >Mặc định</option>
                                <option value="1">Giá giảm dần</option>
                                <option value="2">Giá tăng dần</option>
                                <option value="3">Sản phẩm bán chạy</option>
                            </select>
                        </div>
                        <div className='container-product d-flex justify-content-center flex-wrap row '>
                            {products.map((item, index) => {
                                return (
                                    <div className='product-content col-6 col-sm-4 d-flex flex-column text-center' key={`product-${index}`}>
                                        <div className='product-information'>
                                            <div className='product-detail'>
                                                <img src={require(`../../../assets/img/${item.image}`)} alt='' />
                                                <div className='product-name'>{item.name}</div>
                                            </div>
                                            <div className='product-price'>
                                                <div className='price-sale d-inline-block'>{formatCurrency(item.sale)}</div>
                                                <div className={`${item.sale ? 'price-real' : ''} d-inline-block`}>{formatCurrency(item.price)}</div>
                                                <button>Thêm vào giỏ hàng</button>
                                            </div>
                                            <label className='label-sold'>{item.status}</label>
                                            {!item.status && <label className='label-sale'>50%</label>}

                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Product;
