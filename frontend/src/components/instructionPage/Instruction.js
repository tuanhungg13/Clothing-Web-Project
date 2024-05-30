import React from "react";
import './Instruction.css';
import vd1 from '../../assets/img/poster_7.jpg'

const Instruction = () => {
    return (
        <div className="instruction-page">
            <div className="container">
                <div className="row mt-3">
                    <div className="content-left-post col-8">
                        <h2>Hướng dẫn mua hàng</h2>
                        <div className="fw-bolder fst-italic mb-4">Khi mua hàng tại GenBasic Clothes, bạn có thể lựa chọn một trong cách mua hàng sau:</div>
                        <div className="d-flex flex-column justify-content-start">
                            <p>Bước 1: Bạn có thể truy cập vào website: cchatclothes.vn và thực hiện các cách đặt hàng đơn giản sau:</p>
                            <p>- Nhập thông tin khi đã biết sản phẩm vào ô tìm kiếm, bạn sẽ có kết quả ngay sau khi hoàn thành.</p>
                            <p>- Hoặc bạn có thể click từng danh mục sản phẩm để tìm kiếm:</p>
                            <img src={vd1} />
                        </div>
                        <div>
                            <p>Bước 2: Tìm được sản phẩm cần mua</p>
                            <p className="text-break" style={{ width: '800px' }}>- Sau khi tìm được sản phẩm cần mua, bạn tiến hành đặt hàng hoặc nếu muốn mua thêm các sản phẩm khác
                                bạn hãy thêm sản phẩm vào giỏ hàng và quay trở lại sản phẩm khác để tiến hàng mua thêm.</p>
                            <p className="fst-italic">*Quá trình này có thể lặp lại cho đến khi quý khách hoàn tất việc bỏ tất cả các sản phẩm cần đặt mua vào giỏ hàng. </p>
                            <img src={vd1} />
                            <img src={vd1} />
                        </div>
                        <div>
                            <p>- Sau khi đã chọn được sản phẩm cần mua, bạn bấm vào nút <span className="fw-bolder" style={{ fontWeight: "700", color: 'gray' }}>"THANH TOÁN"</span> và điền đầy đủ thông tin cá nhân bảng thông tin</p>
                            <p className="fst-italic">* Thông tin cá nhân người nhận hàng cần được điền chính xác và đầy đủ để sản phẩm đến tay khách hàng nhanh nhất.</p>
                            <img src={vd1} />
                        </div>
                        <div>
                            <p>- Nếu có mã giảm giá, bạn hãy điền đầy đủ ngay dưới ô <span className="fw-bolder" style={{ fontWeight: "700", color: 'gray' }}>"MÃ GIẢM GIÁ"</span></p>
                            <p>- Sau khi điền đầy đủ thông tin và kiểm tra lại đơn hàng, giá tiền, bạn hãy bấm vào nút <span className="fw-bolder" style={{ fontWeight: "700", color: 'gray' }}>"HOÀN TẤT ĐƠN HÀNG"</span> gửi về cho Cchat Clothes.</p>
                            <p >Hãy để ý điện thoại của mình, Cchat Clothes sẽ gọi điện lại để xác nhận đơn hàng và thông tin giao hàng!</p>
                        </div>
                    </div>
                    <div className="content-right-post col-4">

                    </div>
                </div>

            </div >

        </div >
    )
}

export default Instruction;