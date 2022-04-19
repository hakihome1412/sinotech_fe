/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Carousel, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { CartBlog, CartBlogMain, CartProduct } from "../components";
import { BlogItem, CarouselItem, ProductItem, VendorItem } from "../models";
import { banner1 } from "../public/images";
import { sanityClient, urlFor } from "../sanity";

type Props = {
  products: ProductItem[];
  vendors: VendorItem[];
  blogs: BlogItem[];
  carousels: CarouselItem[];
};

const Home: NextPage<Props> = (props: Props) => {
  const { products, vendors, blogs, carousels } = props;

  return useMemo(
    () => (
      <HomeStyled>
        <Carousel fade interval={3000}>
          {carousels.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                src={urlFor(item.logo).url()!}
                alt="Hình ảnh"
                width="100%"
                height="100%"
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <div className="d-none d-md-block">
                  <p>{item.blurb}</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="some-products-container">
          <Row>
            {vendors.map((item, index) => (
              <Col xs={index < 2 ? 6 : 4} key={index}>
                <Link href={`/product/page/1?vendor=${item.slug.current}`}>
                  <a>
                    <div>
                      <div
                        className={`product-item ${index >= 2 ? "small" : ""}`}
                      >
                        <div className="zoomin content">
                          <Image
                            src={urlFor(item.logo).url()!}
                            alt="product-img"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>

                        <div className="content-text-container">
                          <div className="text-name">
                            {item.title.toUpperCase()}
                          </div>
                          <div className="text-content d-none d-md-block">
                            {item.blurb}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        </div>

        <div className="information-main-product-container">
          <Row>
            <Col lg={12} xl={5}>
              <div className="information-main-product-content">
                <p className="text-bold">Các dòng máy phát điện</p>
                <p className="text-bold">MÁY PHÁT ĐIỆN CUMMINS</p>
                <p>
                  Máy phát điện Cummins – thương hiệu nổi tiếng đến từ Mỹ. Chất
                  lượng đã được khẳng định trên toàn thế giới qua nhiều thập kỉ.
                  Hưng Thịnh là đơn vị hàng đầu phân phối tổ máy phát điện sử
                  dụng động cơ Cummins tại Việt Nam.
                </p>
              </div>
            </Col>
            <Col lg={12} xl={7}>
              <div className="information-main-product-img">
                <img
                  src={urlFor(carousels[0].logo).url()!}
                  alt="product-img"
                  width="100%"
                  height="100%"
                />
              </div>
            </Col>
          </Row>
        </div>

        <Container>
          <div className="main-product-container">
            <h2 className="text-center">SẢN PHẨM CHÍNH</h2>

            <p className="text-center px-5">
              Công Ty Hưng Thịnh Phát – Chuyên cung các loại máy phát điện chính
              hãng được nhập khẩu từ các hãng nổi tiếng: Cummins, Mitsubishi,
              Denyo, Perkins, Doosan… phục vụ sản xuất kinh doanh, mua bán các
              loại biến tần cũ giá rẻ, máy nén khí cũ, máy phát điện cũ, cho
              thuê, bảo trì bảo dưỡng sửa chữa chuyên nghiệp với hơn 15 năm kinh
              nghiệm.
            </p>

            <div className="product-list-container">
              <Row>
                {products.map((item, index) => (
                  <Col xs={12} md={6} lg={4} xl={3} key={index}>
                    <CartProduct data={item} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>

        <div className="about-company-container">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col lg={12} xl={6}>
                <div className="d-flex justify-content-end align-items-center about-company-tab-container">
                  <div className="about-company-tab-area">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">VỀ SINOTECH</Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="my-3">
                        <Nav.Link eventKey="second">
                          TẦM NHÌN VÀ SỨ MỆNH
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          CÔNG TRÌNH TIÊU BIỂU
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
              </Col>
              <Col lg={12} xl={6}>
                <div className="about-company-content-area">
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <p className="text-welcome">
                        CHÀO MỪNG ĐẾN VỚI CHÚNG TÔI
                      </p>

                      <p className="text-title">VỀ SINOTECH</p>

                      <p className="text-content">
                        Trên cơ sở đam mê về máy phát điện của người sáng lập,
                        kết hợp cùng đội ngũ kỹ sư lành nghề được đào tạo bài
                        bản, chính hãng, trải qua nhiều năm kinh nghiệm làm việc
                        ở các đơn vị lớn thuộc ngành máy phát điện khác nhau,
                        chúng tôi phối hợp thành lập Công ty Hưng Thịnh Phát với
                        mong muốn góp phần nhỏ bé của mình phục vụ nhu cầu tất
                        yếu và thiết thực của khách hàng, cũng như để hòa mình
                        vào xu thế phát triển chung của nước nhà.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <p className="text-welcome">
                        CHÀO MỪNG ĐẾN VỚI CHÚNG TÔI
                      </p>

                      <p className="text-title">TẦM NHÌN VÀ SỨ MỆNH</p>

                      <p className="text-content">
                        Chúng tôi luôn từng bước xây dựng công ty Hưng Thịnh
                        Phát ngày càng phát triển và lớn mạnh không ngừng, gia
                        tăng sự phân phối và hỗ trợ của chúng tôi trên toàn
                        quốc. ABC ngày nay đã trở thành một trong những thương
                        hiệu cung cấp máy phát điện, thiết bị công nghiệp, dịch
                        vụ hàng đầu Việt Nam với đầy Uy Tín – Chất Lượng.
                      </p>

                      <p className="text-bold">
                        “Sự yêu mến và tín nhiệm của Quý khách là tiêu chuẩn
                        thước đo của công ty chúng tôi !”
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p className="text-welcome">
                        CHÀO MỪNG ĐẾN VỚI CHÚNG TÔI
                      </p>

                      <p className="text-title">CÔNG TRÌNH TIÊU BIỂU</p>

                      <p className="text-content">
                        Với nhiều năm kinh nghiệm trong việc cung cấp các loại
                        máy phát điện của các thương hiệu nổi tiếng trên thế
                        giới. Hưng Thịnh Phát đã thực hiện hàng trăm dự án cho
                        hàng chục khách hàng khác nhau, các dự án được triển
                        khai khắp nơi tại Việt Nam. Sự hài lòng của khách hàng
                        chính là thành công lớn nhất của chúng tôi.
                      </p>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </div>

        <div className="service-container">
          <div className="card-overlay">
            <Row>
              <Col sm={12} lg={4}>
                <div className="d-flex justify-content-lg-end justify-content-sm-center justify-content-center service-item">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <i className="fa fa-gem" />
                    <h4>CHẤT LƯỢNG SẢN PHẨM</h4>
                    <p>Đạt chuẩn ISO 9001</p>
                  </div>
                </div>
              </Col>
              <Col sm={12} lg={4}>
                <div className="d-flex justify-content-center service-item">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <i className="fa fa-screwdriver-wrench" />
                    <h4>BẢO HÀNH UY TÍN</h4>
                    <p>Hệ thống phân phối trên toàn quốc</p>
                  </div>
                </div>
              </Col>
              <Col sm={12} lg={4}>
                <div className="d-flex justify-content-lg-start justify-content-sm-center justify-content-center service-item">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <i className="fa fa-phone" />
                    <h4>HỖ TRỢ TƯ VẤN 24/7</h4>
                    <p>Hotline tư vấn: 0909.078.509</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <Container>
          <div className="blog-container">
            <div className="d-lg-flex d-sm-block align-items-center justify-content-between mb-5">
              <div className="text-title-blog">Blog.</div>
              <span className="ms-lg-5 w-75">
                Blog chia sẻ kinh nghiệm sửa chữa các loại máy công nghiệp mà
                Hưng Thịnh Phát đang cung cấp như: Biến tần, Máy nén khí, Máy
                phát điện,.. những tin tức xoay quanh chỉ đề hay những tư vấn để
                thuận tiện nhất cho bạn đọc, khách hàng tham khảo. Rất mong nhận
                được nhiều đóng góp để blog đầy đủ hơn.
              </span>
            </div>
            <Row>
              {blogs.map((item, index) =>
                index === 0 ? (
                  <CartBlogMain item={item} key={index} />
                ) : (
                  <Col sm={12} md={6} lg={4} key={index}>
                    <CartBlog item={item} />
                  </Col>
                )
              )}
            </Row>
          </div>
        </Container>

        <div className="customer-response-container">
          <h3 className="text-title">KHÁCH HÀNG PHẢN HỒI VỀ CHÚNG TÔI</h3>
          <Row>
            <Col xs={12} lg={6} xl={4}>
              <div className="d-flex justify-content-xl-end justify-content-lg-center justify-content-center">
                <div className="d-flex customer-item">
                  <div className="img-container">
                    <div className="img-cover">
                      <Image
                        src="/khach-1.jpeg"
                        alt="product-img"
                        layout="fill"
                      />
                    </div>
                  </div>

                  <div className="content">
                    <h4>ANH QUỐC DŨNG</h4>
                    <div className="comment">
                      Tôi đã mua hàng tại đây về sử dụng, ở đây nhân viên chuyên
                      nghiệp, giao hàng nhanh tới tận nhà, lắp đặt từ A-Z. Tôi
                      chỉ việc sử dụng — Rất hài lòng về sản phảm cũng như giá
                      cả.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} xl={4}>
              <div className="d-flex justify-content-center">
                <div className="d-flex customer-item">
                  <div className="img-container">
                    <div className="img-cover">
                      <Image
                        src="/khach-2.jpeg"
                        alt="product-img"
                        layout="fill"
                      />
                    </div>
                  </div>

                  <div className="content">
                    <h4>ANH QUỐC DŨNG</h4>
                    <div className="comment">
                      Tôi đã mua hàng tại đây về sử dụng, ở đây nhân viên chuyên
                      nghiệp, giao hàng nhanh tới tận nhà, lắp đặt từ A-Z. Tôi
                      chỉ việc sử dụng — Rất hài lòng về sản phảm cũng như giá
                      cả.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={12} xl={4}>
              <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-center">
                <div className="d-flex customer-item">
                  <div className="img-container">
                    <div className="img-cover">
                      <Image
                        src="/khach-3.jpeg"
                        alt="product-img"
                        layout="fill"
                      />
                    </div>
                  </div>

                  <div className="content">
                    <h4>ANH QUỐC DŨNG</h4>
                    <div className="comment">
                      Tôi đã mua hàng tại đây về sử dụng, ở đây nhân viên chuyên
                      nghiệp, giao hàng nhanh tới tận nhà, lắp đặt từ A-Z. Tôi
                      chỉ việc sử dụng — Rất hài lòng về sản phảm cũng như giá
                      cả.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </HomeStyled>
    ),
    [carousels, vendors, products, blogs]
  );
};

export default Home;

export const getServerSideProps = async () => {
  const queryProduct = `*[_type == 'product']{ _id, title, slug, price, logo }[0...16]`;
  const queryVendor = `*[_type == 'vendor']{ _id, title, slug, blurb ,logo }[0...5]`;
  const queryBlogNews = `*[_type == 'blog'][0...5]`;
  const queryCarousel = `*[_type == 'carousel']`;

  const products: ProductItem[] = await sanityClient.fetch(queryProduct);
  const vendors: VendorItem[] = await sanityClient.fetch(queryVendor);
  const blogs: BlogItem[] = await sanityClient.fetch(queryBlogNews);
  const carousels: CarouselItem[] = await sanityClient.fetch(queryCarousel);

  return {
    props: {
      products,
      vendors,
      blogs,
      carousels,
    },
  };
};

const HomeStyled = styled.div`
  .carousel {
    .carousel-inner {
      .carousel-item {
        .carousel-caption {
          color: black;
          h3 {
            font-weight: bolder;
          }
        }
      }
    }
    .carousel-indicators {
      button {
        width: 1rem;
        height: 1rem;
        border-top: none;
        border-bottom: none;
        border-radius: 50px;
      }
    }
  }

  .some-products-container {
    padding: 1rem;
    .row {
      --bs-gutter-y: 1rem;
    }
    .product-item {
      cursor: pointer;
      position: relative;
      height: 100%;
      .content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
      }
      &.small {
        .zoomin {
          height: 250px;
        }
      }
      .zoomin {
        position: relative;
        height: 400px;
        span {
          width: 100% !important;
          height: 100% !important;
          img {
            width: 100%;
            height: 100%;
            -webkit-transition: all 1s ease;
            -moz-transition: all 1s ease;
            -ms-transition: all 1s ease;
            transition: all 1s ease;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }

      .content-text-container {
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        color: white;
        .text-name {
          font-weight: bold;
          font-size: 24px;
        }
      }
    }
  }

  .information-main-product-container {
    margin: 2rem 0;
    background-color: #fe4e16;
    padding: 2% 5%;
    position: relative;
    color: white;
    .information-main-product-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      .text-bold {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .information-main-product-img {
      max-height: 400px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .main-product-container {
    .row {
      --bs-gutter-y: 1.5rem;
    }
    .product-list-container {
      padding: 0 2rem;
    }
  }

  .about-company-container {
    .row {
      --bs-gutter-x: 0;
    }
    margin-top: 2rem;
    .about-company-tab-container {
      border-width: 1px 0 1px 0;
      border-style: solid;
      border-color: white;
      background-image: url("/bg-city.jpeg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: calc(100vh / 1.5);
      background-position: top;
      background-size: cover;
      width: 100%;
      position: relative;
      .about-company-tab-area {
        .nav-pills .nav-link {
          background: 0 0;
          border: 0;
          border-radius: 0;
        }
        .nav {
          .nav-item {
            cursor: pointer;
            .nav-link {
              border: 0;
              font-weight: bold;
              font-size: 24px;
              border-width: 1px 0 1px 1px;
              border-style: solid;
              background-color: #999999;
              padding-top: 0.8rem;
              height: 60px;
              border-color: white;
              color: white;
              transition: 0.5s;
              &.active {
                background-color: #fe4e16;
              }
            }
          }
        }
      }
    }

    .about-company-content-area {
      background-color: #fe4e16;
      color: white;
      height: 100%;
      border-width: 1px 0 1px 1px;
      border-style: solid;
      border-color: white;
      .tab-content {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 2rem;
        .text-welcome {
          font-weight: bold;
          font-size: 16px;
        }
        .text-title {
          font-weight: bold;
          font-size: 42px;
        }
      }
    }
  }

  .service-container {
    .card-overlay {
      background: rgba(0, 0, 0, 0.5);
      .row {
        --bs-gutter-x: 0 !important;
      }
      background-image: url("/bg-service.webp");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: top;
      background-size: cover;
      color: white;
      margin-top: 1px;
      .service-item {
        padding-top: 2rem;
        width: 100%;
        .fa {
          font-size: 6rem;
          margin-bottom: 1rem;
        }
      }
    }
  }

  .blog-container {
    margin-top: 2rem;
    .row {
      --bs-gutter-x: 3rem !important;
      --bs-gutter-y: 2rem !important;
      @media (max-width: 992px) {
        --bs-gutter-x: 1.5rem !important;
      }
    }
    .text-title-blog {
      font-weight: bold;
      font-size: 7rem !important;
      @media (max-width: 992px) {
        font-size: 3rem !important;
        text-align: center;
      }
    }
    .blog-item {
      margin-top: 2rem;
      .content {
        margin-top: 0.8rem;
        &.no-margin-top {
          margin-top: 0;
        }
      }
      .img-container {
        cursor: pointer;
      }
      .text-title {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .logo-container {
        width: 50px;
        height: 50px;
        border-radius: 100px;
        .img-cover {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 100px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            font-family: "object-fit: cover;";
            margin-left: auto;
            margin-right: auto;
            border-radius: 100px;
          }
        }
      }
    }
  }

  .customer-response-container {
    padding: 2rem 0;
    margin-top: 3rem;
    background-image: url("/bg-city.jpeg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    color: white;
    .row {
      --bs-gutter-x: 0 !important;
      overflow: hidden;
    }
    .text-title {
      text-align: center;
      font-weight: bolder;
      color: #fe4e16;
    }
    .customer-item {
      padding-top: 2rem;
      .img-container {
        width: 100px;
        height: 100px;
        border-radius: 100px;
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
            border-radius: 100px;
          }
        }
      }
      .content {
        margin-left: 1rem;
        width: 200px;
        h4 {
          color: #ff8059;
        }
      }
      .comment {
        word-break: break-all;
      }
    }
  }
`;
