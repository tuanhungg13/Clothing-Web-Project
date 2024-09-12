import React, { useEffect, useState } from 'react';
import './Home.scss';
import poster1 from '../../../assets/img/poster_4.jpg';
import poster2 from '../../../assets/img/poster_5.jpg';
import poster3 from '../../../assets/img/poster_6.jpg';
import poster4 from '../../../assets/img/poster_8.jpeg';
import poster5 from '../../../assets/img/poster_3.jpg';
import poster6 from '../../../assets/img/poster_2.jpg';
import { NavLink } from 'react-router-dom';
import Banner from "../../../components/banner/Banner";
import DisplayProduct from '../../../components/displayProduct/DisplayProduct';
import SliderComponent from '../../../components/slider/Slider';
import { apiGetProducts } from '../../../service/productApiService';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
const Home = () => {
    const background = [poster1, poster2, poster3, poster4, poster5, poster6];
    const [productBestSeller, setProductBestSeller] = useState([])
    const [newProduct, setNewProduct] = useState([]);
    const limit = 15;
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchProducts()
    }, [])
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const [bestSellers, newProducts] = await Promise.all([
                apiGetProducts({ limit: limit, page: 1, sort: "-sold" }),
                apiGetProducts({ limit: limit, page: 1, sort: "-createdAt" })
            ])
            if (bestSellers && bestSellers.EC === 0) setProductBestSeller(bestSellers.DT)
            if (newProducts && newProducts.EC === 0) setNewProduct(newProducts.DT);
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại")
        }
        setLoading(false)
    }
    return (
        <>
            {/* background-header */}
            <div className="slideshow-container">
                <Banner images={background} />
            </div>
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='title-top col-sm-12'>
                            <h3>TOP SẢN PHẨM HOT NHẤT TUẦN</h3>
                        </div>
                    </div>
                    <div className='container-product d-flex justify-content-center flex-wrap row mt-5'>
                        {loading ? (
                            <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                                <Spin size="large" />
                            </div>
                        ) : (
                            <div>
                                <DisplayProduct productList={productBestSeller} />
                                <div className='product-other'>
                                    Mời bạn <NavLink to='/san-pham'>xem thêm các sản phẩm hot</NavLink> khác
                                </div>
                            </div>
                        )}

                    </div>

                    <div className='row'>
                        <div className='row'>
                            <div className='title-top col-sm-12' style={{ marginTop: '30px' }}>
                                <h3>TOP SẢN PHẨM MỚI</h3>
                            </div>
                        </div>
                    </div>
                    <div className='container-product d-flex justify-content-center flex-wrap row '>
                        {loading ? (
                            <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                                <Spin size="large" />
                            </div>
                        ) : (
                            <div className='product-other'>
                                <DisplayProduct productList={newProduct} />

                                Mời bạn <NavLink to='/san-pham'>xem thêm các sản phẩm hot</NavLink> khác
                            </div>
                        )}
                    </div>
                    {/* danh sách kiểu phối đồ */}
                    <div className='outfit'>
                        <div className='row'>
                            <div className='title-top col-sm-12' style={{ marginTop: '30px' }}>
                                <h3>STYLING</h3>
                            </div>
                        </div>
                        <div className='container-outfit'>
                            <div className='content-outfit'>
                                <div className='list-outfit' >
                                    <SliderComponent />

                                </div>
                                <div className='buttons'>
                                    {/* <button >{`<`}</button>
                                    <button >{`>`}</button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;