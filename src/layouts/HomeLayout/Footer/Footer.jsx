import { Col, Row } from "antd";
import { Footer as FooterAntd } from "antd/es/layout/layout";
import Logo from "../../../assets/logo.png";

function Footer() {
  return (
    <>
      <FooterAntd className="text-center items-center justify-center text-black w-full p-0">
        <Row justify="space-around" className="pb-3">
          <Col span={1} />
          <Col span={3} className="flex justify-center">
            <div className="p-3">
              <a href="/">
                <img src={Logo} className="h-16 w-80 bg-contain" />
              </a>
            </div>
          </Col>
          <Col span={3}>
            <div className="font-bold">Về chúng tôi</div>
            <ul className="pt-2">
              <li className="py-1 px-1">
                <a href="/">Điều khoản sử dụng</a>
              </li>
              <li className="py-1 px-1">
                <a href="/">Chính sách bảo mật</a>
              </li>
              <li className="py-1 px-1">
                <a href="/">Điều khoản và quy định</a>
              </li>
              <li className="py-1 px-1">
                <a href="/">Liên hệ</a>
              </li>
            </ul>
          </Col>

          <Col span={3}>
            <div className="font-bold">Hỗ trợ khách hàng</div>
            <ul className="pt-2">
              <li className="py-1 px-1">
                <a href="/">Điều khoản sử dụng</a>
              </li>
              <li className="py-1 px-1">
                <a href="/">Chính sách bảo mật</a>
              </li>
              <li className="py-1 px-1">
                <a href="/">Điều khoản và quy định</a>
              </li>
              <li className="py-1 px-1">
                <a href="/">Liên hệ</a>
              </li>
            </ul>
          </Col>
          <Col span={4}>
            <div className="font-bold">Kết nối với chúng tôi</div>
          </Col>
          <Col span={2} />
        </Row>
        <Row className="flex justify-center items-center pt-2 bg-slate-300 pb-2 font-semibold">
          Copyrights © {new Date().getFullYear()} . All rights reserved.
        </Row>
      </FooterAntd>
    </>
  );
}

export default Footer;
