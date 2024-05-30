import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import poster1 from '../../assets/img/poster_4.jpg';
import poster2 from '../../assets/img/poster_5.jpg';
import poster3 from '../../assets/img/poster_6.jpg';
import poster4 from '../../assets/img/poster_8.jpeg';
import poster5 from '../../assets/img/poster_3.jpg';
import poster6 from '../../assets/img/poster_2.jpg';
import introduce from '../../assets/video/introduce.mp4'
import data from '../../data/data.json';
import { NavLink } from 'react-router-dom';
const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentOutfit, setCurrentOutfit] = useState(0);
    const listOutfit = useRef(null)
    const listRef = useRef(null);
    const listDots = useRef(null);
    const itemsLength = useRef(0);
    const itemsOutfitLength = useRef(0);
    const intervalRef = useRef(null); // Dùng để lưu trữ interval ID
    const backgroundImg = [poster1, poster2, poster3, poster4, poster5, poster6];
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(data.products);
        const items = listRef.current.querySelectorAll('.items');
        itemsLength.current = items.length;
        const itemsOutfit = listOutfit.current.querySelectorAll('.items-outfit');
        itemsOutfitLength.current = itemsOutfit.length;
    }, []);

    useEffect(() => {
        // Bắt đầu trình chiếu tự động
        startAutoSlide();
        reloadSlideshow();
        return () => {
            clearInterval(intervalRef.current);
        }

    }, [currentSlide]);

    useEffect(() => {
        reloadSlideOutfit();
    }, [currentOutfit])

    const reloadSlideshow = () => {
        if (listRef.current && itemsLength.current > 0) {
            const items = listRef.current.querySelectorAll('.items');
            const checkLeft = items[currentSlide].offsetLeft;
            listRef.current.style.left = -checkLeft + 'px';
        }
    }


    const startAutoSlide = () => {     //set time auto change img
        intervalRef.current = setInterval(() => {
            handleClickNextImg();
        }, 3000);
    };


    const handleClickNextImg = () => {
        setCurrentSlide((currentSlide + 1) % itemsLength.current);
    };

    const handleClickPrevImg = () => {
        setCurrentSlide((currentSlide - 1 + itemsLength.current) % itemsLength.current);

    };

    const handleClickDots = (index) => {
        setCurrentSlide(index);

    };
    const reloadSlideOutfit = () => {
        if (listOutfit.current && itemsOutfitLength.current > 0) {
            const itemsOutfit = listOutfit.current.querySelectorAll('.items-outfit');
            const checkLeft = itemsOutfit[currentOutfit].offsetLeft;
            listOutfit.current.style.left = -checkLeft + 'px';
        }
    }

    const handleClickNextOutfit = () => {
        if (currentOutfit >= (itemsOutfitLength.current / 2) - 1) {
            return;
        }
        else {
            setCurrentOutfit((currentOutfit + 1));
        }


    };

    const handleClickPrevOutfit = () => {
        if (currentOutfit <= 0) {
            return;
        }
        else {
            setCurrentOutfit((currentOutfit - 1));
        }

    };

    return (
        <div>
            {/* background-header */}
            <div className="slideshow-container">
                <div className='list-slides' ref={listRef}>
                    {backgroundImg.map((item, index) => {
                        return (
                            <div className='items' key={`bg-${index}`}>
                                <img src={item} alt='' />
                            </div>
                        )
                    })}

                </div>
                <div className='buttons'>
                    <button onClick={handleClickPrevImg}>{`<`}</button>
                    <button onClick={handleClickNextImg}>{`>`}</button>
                </div>
                <div className='dots' rel={listDots}>
                    {[...Array(itemsLength.current).keys()].map(index => (
                        <li
                            key={index}
                            className={(currentSlide - 1) === index - 1 ? "active" : ""}
                            onClick={() => handleClickDots(index)}
                        ></li>
                    ))}
                </div>
            </div>
            {/* thông tin sản phẩm bán */}
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='title-top col-sm-12'>
                            <h3>TOP SẢN PHẨM HOT NHẤT TUẦN</h3>
                        </div>
                    </div>
                    <div className='container-product d-flex justify-content-center flex-wrap row '>
                        {products.map((item, index) => {
                            return (
                                <div className='content-product col-6 col-sm-4 d-flex flex-column  text-center' key={`product-${index}`}>
                                    <div className='product-information'>
                                        <div className='product-detail '>
                                            <img src={require(`../../assets/img/${item.image}`)} alt='' />
                                            <div className='product-name'>{item.name}</div>
                                        </div>
                                        <div className='product-price'>
                                            <div>{item.price}</div>
                                            <button>Thêm vào giỏ hàng</button>
                                        </div>
                                        <label className='label-sold'>Hết hàng</label>
                                    </div>
                                </div>
                            )
                        })}



                        <div className='product-other'>
                            Mời bạn <NavLink to='/san-pham'>xem thêm các sản phẩm hot</NavLink> khác
                        </div>

                    </div>

                    <div className='row'>
                        <div className='row'>
                            <div className='title-top col-sm-12' style={{ marginTop: '30px' }}>
                                <h3>TOP SẢN PHẨM HOT NHẤT TUẦN</h3>
                            </div>
                        </div>
                    </div>
                    <div className='container-product d-flex justify-content-center flex-wrap row '>
                        {data['new-product'].map((item, index) => {
                            return (
                                <div className='content-product col-sm-4 d-flex flex-column  text-center'>
                                    <div className='product-detail '>
                                        <img src={require(`../../assets/img/${item.image}`)} alt='' />
                                        <div className='product-name'>{item.name}</div>
                                    </div>
                                    <div className='product-price'>
                                        <div>{item.price}</div>
                                        <button>Thêm vào giỏ hàng</button>
                                    </div>
                                </div>
                            )
                        })}


                        <div className='product-other'>
                            Mời bạn <NavLink to='/san-pham'>xem thêm các sản phẩm hot</NavLink> khác
                        </div>
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
                                <div className='list-slides' ref={listOutfit}>
                                    {data.outfit.map((item, index) => {
                                        return (
                                            <div className='items-outfit' key={`outfit-${index}`}>
                                                <img src={require(`../../assets/img/${item.image}`)} alt='' />
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className='buttons'>
                                    <button onClick={handleClickPrevOutfit}>{`<`}</button>
                                    <button onClick={handleClickNextOutfit}>{`>`}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='advertisement d-flex'>
                        <div className='video-introduce'>
                            <video controls>
                                <source src={introduce} type="video/mp4" />
                            </video>
                        </div>

                        <div className='text-introduce text-break'>
                            <h3>LEVENTS® S/S24 COLLECTION</h3>
                            <p>
                                Mùa Xuân 2024, Levents® mang đến bộ sưu tập mới với những
                                items mang đậm tinh thần sáng tạo để khích lệ chất riêng trong phong
                                cách thời trang cũng như tính cách của từng bạn trẻ.
                            </p>
                            <p>
                                Các items đều được chăm chút tỉ mỉ đến từng chi tiết, thiết kế và
                                chất liệu để mang đến những sản phẩm chất lượng vượt trội, độ bền cao, nổi bật
                                nhưng vẫn thanh lịch và phù hợp với mọi giới tính cũng như dáng người.
                                Đảm bảo bất kì ai cũng có thể tự tin thể hiện bản thân, lan tỏa năng
                                lượng tích cực khi diện lên mình các sản phẩm đến từ Levents®.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Home;
