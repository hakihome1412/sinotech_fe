import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useMemo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { logo } from "../public/images";

const Footer = (): JSX.Element => {
  const LIST_SOCIAL = useMemo(
    () => [
      {
        name: "youtube",
        icon: <i className="fa-brands fa-youtube" />,
        link: "https://www.youtube.com/",
      },
      {
        name: "facebook",
        icon: <i className="fa-brands fa-facebook" />,
        link: "https://www.facebook.com/",
      },
      {
        name: "email",
        icon: <i className="fa fa-envelope" />,
        link: "mailto: huynhphuchuy1412@gmail.com",
      },
      {
        name: "phone",
        icon: <i className="fa fa-phone" />,
        link: "tel:+84999999999",
      },
    ],
    []
  );

  return useMemo(
    () => (
      <Fragment>
        <FooterStyled className="pb-sm-5">
          <Container>
            <Row>
              <Col sm={12} md={3}>
                <div className="footer-about-company-container">
                  <Link href="/">
                    <a>
                      <div className="img-container">
                        <div className="img-cover">
                          <Image src={logo} alt="product-img" />
                        </div>
                      </div>
                    </a>
                  </Link>

                  <div className="content">
                    Chuyên cung các loại máy phát điện chính hãng được nhập khẩu
                    từ các hãng nổi tiếng: Cummins, Mitsubishi, Denyo, Perkins,
                    Doosan… phục vụ sản xuất kinh doanh...
                  </div>
                </div>
              </Col>
              <Col sm={12} md={3}>
                <div className="footer-support-container">
                  <h5>HỖ TRỢ KHÁCH HÀNG</h5>

                  <Link href="/">
                    <a>
                      <div className="support-item">Hướng dẫn đặt hàng</div>
                    </a>
                  </Link>

                  <Link href="/">
                    <a>
                      <div className="support-item">Hướng dẫn thanh toán</div>
                    </a>
                  </Link>

                  <Link href="/">
                    <a>
                      <div className="support-item">Chính sách đại lý</div>
                    </a>
                  </Link>

                  <Link href="/">
                    <a>
                      <div className="support-item">Hỏi đáp vấn đề</div>
                    </a>
                  </Link>

                  <Link href="/">
                    <a>
                      <div className="support-item">Tuyển dụng</div>
                    </a>
                  </Link>
                </div>
              </Col>
              <Col sm={12} md={3}>
                <div className="footer-contact-container">
                  <h5>THÔNG TIN LIÊN HỆ</h5>
                  <div className="text-company">
                    CÔNG TY TNHH SX - TM - XNKABC
                  </div>
                  <ul>
                    <li>Địa chỉ: Phạm Văn Bạch, P. 15, Q. Tân Bình, Tp. HCM</li>
                    <li>Điện thoại: 0999.999.999</li>
                    <li>Email: email@gmail.com</li>
                  </ul>
                </div>
              </Col>
              <Col sm={12} md={3}>
                <div className="footer-register-container">
                  <h5>ĐĂNG KÝ NHẬN KHUYẾN MẠI</h5>
                  <Form.Control placeholder="Địa chỉ email (*)" />
                  <Button variant="secondary" className="mt-2">
                    Đăng ký
                  </Button>

                  <div className="d-flex align-items-center mt-3 justify-content-between w-75 font-20">
                    {LIST_SOCIAL.map((item, index) => (
                      <a
                        href={item.link}
                        key={index}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </FooterStyled>

        <BottomDivStyled>
          <Container>
            <div className="d-flex align-items-center justify-content-between py-2">
              <span>
                © Bản quyền thuộc về SINOTECH <div className="vr" /> Thiết kế và
                duy trì bởi Huy
              </span>
              <span className="ms-5">Hotline: 0932774940</span>
            </div>
          </Container>
        </BottomDivStyled>
      </Fragment>
    ),
    [LIST_SOCIAL]
  );
};

export default Footer;

const FooterStyled = styled.footer`
  margin-top: 3rem;
  border-top: 1px solid #eaeaea;
  .row {
    --bs-gutter-y: 2rem;
  }
  padding: 2rem 0 5rem 0;
  .footer-about-company-container {
    .img-container {
      width: 100%;
      height: 100%;
      .img-cover {
        position: relative;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          font-family: "object-fit: cover;";
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
    .content {
      margin-top: 1rem;
    }
  }

  .footer-support-container {
    .support-item {
      cursor: pointer;
      margin-top: 10px;
    }
  }

  .footer-contact-container {
    .text-company {
      font-size: 16px;
    }
    ul {
      li {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
`;

const BottomDivStyled = styled.div`
  background-color: #fe4e16;
  color: white;
  font-size: 12px;
`;
