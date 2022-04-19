/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React, { Fragment, useMemo } from "react";
import {
  Carousel,
  Col,
  Container,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  CartBlog,
  CartBlogNewRightSide,
  CartProduct,
  CartProductNewRightSide,
} from "../../components";
import { Functions } from "../../constants";
import { BlogItem, ProductItem } from "../../models";
import { sanityClient, urlFor } from "../../sanity";

type Props = {
  productMain: ProductItem;
  productsNews: ProductItem[];
  blogsNews: BlogItem[];
};

const Product: NextPage<Props> = (props: Props) => {
  const { productsNews, productMain, blogsNews } = props;

  const LIST_SOCIAL = useMemo(
    () => [
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
      <ProductStyled>
        <div className="breadcrumb-container">
          <Container>
            <div>
              <Link href="/">
                <a className="breadcrumb-custom-item">TRANG CHỦ</a>
              </Link>{" "}
              /{" "}
              <Link href="/product/page/1">
                <a className="breadcrumb-custom-item">SẢN PHẨM</a>
              </Link>{" "}
              /{" "}
              <Link href={`/product/${productMain.slug.current}`}>
                <a className="breadcrumb-custom-item active">
                  {productMain.title.toUpperCase()}
                </a>
              </Link>
            </div>
          </Container>
        </div>

        <div className="body-content-container">
          <Container>
            <Row>
              <Col md={12} lg={9}>
                <div className="summary-information-container">
                  <Row>
                    <Col md={12} lg={6}>
                      <Carousel variant="dark" indicators={false}>
                        {productMain.images?.map((image, index) => (
                          <Carousel.Item key={index}>
                            <TransformWrapper>
                              <TransformComponent>
                                <img
                                  src={urlFor(image).url()!}
                                  alt="product-img"
                                  width="100%"
                                  height="100%"
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </Col>
                    <Col md={12} lg={6}>
                      <div className="primary-information-container">
                        <h2>{productMain.title}</h2>
                        <p className="text-price">
                          {productMain.price
                            ? `${Functions.NumberWithCommas(
                                productMain.price
                              )} VNĐ`
                            : "Liên hệ báo giá"}
                        </p>
                        <p>{productMain.blurb}</p>
                        <div className="mt-3">
                          <ListGroup variant="flush">
                            {productMain.idProduct && (
                              <ListGroup.Item>
                                <Row>
                                  <Col xs={5}>Mã SP</Col>
                                  <Col xs={7}>{productMain.idProduct}</Col>
                                </Row>
                              </ListGroup.Item>
                            )}

                            {productMain.insurance && (
                              <ListGroup.Item>
                                <Row>
                                  <Col xs={5}>Bảo Hành</Col>
                                  <Col xs={7}>{productMain.insurance}</Col>
                                </Row>
                              </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                              <div className="sent-phone-container">
                                <p>
                                  Hãy để lại{" "}
                                  <span className="text-bold">
                                    SĐT, Chuyên viên tư vấn
                                  </span>{" "}
                                  của chúng tôi sẽ gọi ngay cho bạn{" "}
                                  <span className="text-bold">miễn phí</span> !!
                                </p>

                                <div className="btn-search-container">
                                  <input placeholder="Nhập SĐT" />
                                  <button>
                                    <i className="fa fa-search" />
                                  </button>
                                </div>
                              </div>

                              {productMain.idProduct && (
                                <div className="mt-2">
                                  Mã: {productMain.idProduct}
                                </div>
                              )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <div>
                                Danh mục:{" "}
                                {productMain.categories?.map((item, index) => (
                                  <Link
                                    href={`/product/page/1?category=${item.slug?.current}`}
                                    key={index}
                                  >
                                    <a>
                                      <span>{item.title} </span>
                                    </a>
                                  </Link>
                                ))}
                                ,{" "}
                                {productMain.vendor && (
                                  <Link
                                    href={`/product/page/1?vendor=${productMain.vendor.slug?.current}`}
                                  >
                                    <a>
                                      <span>{productMain.vendor.title} </span>
                                    </a>
                                  </Link>
                                )}
                              </div>
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <div className="d-flex align-items-center">
                                <span>Liên hệ: </span>
                                <div className="d-flex align-items-center ms-3 justify-content-between w-25 font-20">
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
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="details-information-container mt-4">
                  <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="home" title="Mô Tả" className="p-3">
                      <div className="detail-table-container">
                        <div className="p-3">
                          <h5>1.TỔ HỢP</h5>
                        </div>
                        <Row>
                          {productMain.description?.overview?.brand && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Thương hiệu
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.overview?.brand}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview?.model && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Model
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.overview?.model}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview?.origin && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Xuất xứ
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.overview?.origin}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview
                            ?.qualityManagementStandards && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn quản lý chất lượng
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.overview
                                    ?.qualityManagementStandards
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview
                            ?.environmentManagementStandards && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn quản lý môi trường
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.overview
                                    ?.environmentManagementStandards
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview
                            ?.manufacturingQualityStandards && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn chất lượng chế tạo
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.overview
                                    ?.manufacturingQualityStandards
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview?.prime && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Prime (kVA/kW)
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.overview?.prime}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview?.standby && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Standby (kVA/kW)
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.overview?.standby}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview?.voltage && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Điện áp
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.overview?.voltage}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview?.size && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Kích thước: ( Dài x rộng x cao )
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.overview?.size}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview?.weight && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Trọng lượng máy (Kg)
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.overview?.weight}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview
                            ?.fuelConsumption50 && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu hao nhiên liệu mức: 50% tải ( L/h )
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.overview
                                    ?.fuelConsumption50
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview
                            ?.fuelConsumption75 && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu hao nhiên liệu mức: 75% tải ( L/h )
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.overview
                                    ?.fuelConsumption75
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.overview
                            ?.fuelConsumption100 && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu hao nhiên liệu mức: 100% tải ( L/h )
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.overview
                                    ?.fuelConsumption100
                                }
                              </Col>
                            </Fragment>
                          )}
                        </Row>

                        <Row>
                          <Col xs={12} className="border-top-field">
                            <h5>2.ĐỘNG CƠ</h5>
                          </Col>

                          {productMain.description?.engine?.brand && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Hãng sản xuất
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.engine?.brand}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine?.model && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Model
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.engine?.model}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine
                            ?.qualityManagementStandards && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn quản lý chất lượng
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.engine
                                    ?.qualityManagementStandards
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine?.typeEngine && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Kiểu
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.engine?.typeEngine}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine?.startingSystem && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Hệ thống khởi động
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.engine
                                    ?.startingSystem
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine?.rotationSpeed && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tốc độ vòng quay
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.engine?.rotationSpeed}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine?.voltage && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Điện áp
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.engine?.voltage}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine
                            ?.numbersOfCylinder && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Số xy lanh
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.engine
                                    ?.numbersOfCylinder
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine
                            ?.pistonRunningCompartment && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Khoang chạy piton
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.engine
                                    ?.pistonRunningCompartment
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine
                            ?.cylinderCapacity && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Dung tích xilanh
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.engine
                                    ?.cylinderCapacity
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine?.coolingSystem && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Hệ thống làm mát
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.engine?.coolingSystem}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.engine
                            ?.acceleratorStructure && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Cơ cấu Bộ điều tốc
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.engine
                                    ?.acceleratorStructure
                                }
                              </Col>
                            </Fragment>
                          )}
                        </Row>

                        <Row>
                          <Col xs={12} className="border-top-field">
                            <h5>3.ĐẦU PHÁT</h5>
                          </Col>

                          {productMain.description?.player?.brand && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Hãng sản xuất
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.player?.brand}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player?.model && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Model
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.player?.model}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player
                            ?.qualityManagementStandards && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn quản lý chất lượng
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.player
                                    ?.qualityManagementStandards
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player
                            ?.productionStandard && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn sản xuất
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.player
                                    ?.productionStandard
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player
                            ?.radioInterferenceCoefficient && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Hệ số nhiễu sóng vô tuyến
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.player
                                    ?.radioInterferenceCoefficient
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player?.typePlayer && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Kiểu đầu phát
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.player?.typePlayer}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player?.voltage && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Điện áp
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.player?.voltage}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player
                            ?.voltageRegulatorMechanism && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Cơ cấu điều chỉnh điện áp (V)
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.player
                                    ?.voltageRegulatorMechanism
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player?.numbersOfPhase && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Số pha
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.player
                                    ?.numbersOfPhase
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player
                            ?.conversionCoefficient && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Hệ số quy đổi
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.player
                                    ?.conversionCoefficient
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player?.protectionLevel && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Cấp bảo vệ
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.player
                                    ?.protectionLevel
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.player?.isulation && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Cấp cách điện (Isulation)
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.player?.isulation}
                              </Col>
                            </Fragment>
                          )}
                        </Row>

                        <Row>
                          <Col xs={12} className="border-top-field">
                            <h5>4.BỘ ĐIỀU KHIỂN</h5>
                          </Col>

                          {productMain.description?.remoteControl?.origin && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Xuất xứ
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {productMain.description?.remoteControl?.origin}
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.remoteControl
                            ?.qualityManagementStandards && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn quản lý chất lượng
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-bold text-center"
                              >
                                {
                                  productMain.description?.remoteControl
                                    ?.qualityManagementStandards
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.remoteControl
                            ?.productionStandard && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Tiêu chuẩn sản xuất
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {
                                  productMain.description?.remoteControl
                                    ?.productionStandard
                                }
                              </Col>
                            </Fragment>
                          )}

                          {productMain.description?.remoteControl?.option && (
                            <Fragment>
                              <Col
                                xs={4}
                                sm={3}
                                className="border-top-field border-right-field"
                              >
                                Chức năng
                              </Col>
                              <Col
                                xs={8}
                                sm={9}
                                className="border-top-field text-center"
                              >
                                {productMain.description?.remoteControl?.option}
                              </Col>
                            </Fragment>
                          )}
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="profile" title="Đánh Giá">
                      asdasdasddeeeeeee
                    </Tab>
                  </Tabs>
                </div>

                <hr />

                <div className="relative-products-container">
                  <h5>SẢN PHẨM TƯƠNG TỰ</h5>
                  <Row>
                    {productsNews.map((item, index) => (
                      <Col xs={12} sm={6} md={4} key={index}>
                        <CartProduct data={item} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
              <Col md={12} lg={3}>
                <div className="blog-product-new-container">
                  <div className="blogs-container mt-4">
                    <h4>Bài viết mới nhất</h4>

                    <div className="mt-2">
                      <div className="d-none d-lg-block desktop-container">
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            {blogsNews.map((item, index) => (
                              <CartBlogNewRightSide item={item} key={index} />
                            ))}
                          </ListGroup.Item>
                        </ListGroup>
                      </div>

                      <div className="d-md-block d-lg-none">
                        <Row>
                          {blogsNews.map((item, index) => (
                            <Col sm={12} md={6} lg={4} key={index}>
                              <CartBlog item={item} />
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className="products-container mt-4">
                    <h4>Sản phẩm mới</h4>

                    <div className="mt-2">
                      <div className="d-none d-lg-block desktop-container">
                        <ListGroup variant="flush">
                          {productsNews.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <CartProductNewRightSide data={item} />
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </div>

                      <div className="d-md-block d-lg-none">
                        <Row>
                          {productsNews.map((item, index) => (
                            <Col xs={12} sm={6} md={4} key={index}>
                              <CartProduct data={item} />
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ProductStyled>
    ),
    [
      LIST_SOCIAL,
      blogsNews,
      productMain.blurb,
      productMain.description?.engine?.acceleratorStructure,
      productMain.description?.engine?.brand,
      productMain.description?.engine?.coolingSystem,
      productMain.description?.engine?.cylinderCapacity,
      productMain.description?.engine?.model,
      productMain.description?.engine?.numbersOfCylinder,
      productMain.description?.engine?.pistonRunningCompartment,
      productMain.description?.engine?.qualityManagementStandards,
      productMain.description?.engine?.rotationSpeed,
      productMain.description?.engine?.startingSystem,
      productMain.description?.engine?.typeEngine,
      productMain.description?.engine?.voltage,
      productMain.description?.overview?.brand,
      productMain.description?.overview?.environmentManagementStandards,
      productMain.description?.overview?.fuelConsumption100,
      productMain.description?.overview?.fuelConsumption50,
      productMain.description?.overview?.fuelConsumption75,
      productMain.description?.overview?.manufacturingQualityStandards,
      productMain.description?.overview?.model,
      productMain.description?.overview?.origin,
      productMain.description?.overview?.prime,
      productMain.description?.overview?.qualityManagementStandards,
      productMain.description?.overview?.size,
      productMain.description?.overview?.standby,
      productMain.description?.overview?.voltage,
      productMain.description?.overview?.weight,
      productMain.description?.player?.brand,
      productMain.description?.player?.conversionCoefficient,
      productMain.description?.player?.isulation,
      productMain.description?.player?.model,
      productMain.description?.player?.numbersOfPhase,
      productMain.description?.player?.productionStandard,
      productMain.description?.player?.protectionLevel,
      productMain.description?.player?.qualityManagementStandards,
      productMain.description?.player?.radioInterferenceCoefficient,
      productMain.description?.player?.typePlayer,
      productMain.description?.player?.voltage,
      productMain.description?.player?.voltageRegulatorMechanism,
      productMain.description?.remoteControl?.option,
      productMain.description?.remoteControl?.origin,
      productMain.description?.remoteControl?.productionStandard,
      productMain.description?.remoteControl?.qualityManagementStandards,
      productMain.idProduct,
      productMain.images,
      productMain.insurance,
      productMain.price,
      productMain.slug,
      productMain.title,
      productsNews,
      productMain.categories,
      productMain.vendor,
    ]
  );
};

export default Product;

export const getStaticPaths = async () => {
  const query = `*[_type == 'product']{_id, slug{ current }}`;

  const products: ProductItem[] = await sanityClient.fetch(query);

  const paths = products.map((item: ProductItem) => ({
    params: {
      slug: item.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryMainProduct = `  *[_type == 'product' && slug.current == "${params?.slug}"]{..., categories[]->, vendor-> }[0]`;
  const queryProductNews = `*[_type == 'product']{ _id, title, slug, price, logo }[0...5]`;
  const queryBlogNews = `*[_type == 'blog']{ _id, title, slug, logo , blurb, _createAt }[0...5]`;

  const productsNews: ProductItem[] = await sanityClient.fetch(
    queryProductNews
  );
  const productMain: ProductItem = await sanityClient.fetch(queryMainProduct);

  const blogsNews: BlogItem[] = await sanityClient.fetch(queryBlogNews);

  if (!productMain) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productsNews,
      productMain,
      blogsNews,
    },
  };
};

const ProductStyled = styled.div`
  .breadcrumb-container {
    padding: 1rem;
    color: white;
    background-color: #fe4e16;
    .breadcrumb-custom-item {
      &.active {
        font-weight: bold;
      }
    }
  }

  .body-content-container {
    margin: 2rem 0;
    .blog-product-new-container {
      .desktop-container {
        .img-container {
          width: 60px;
          height: 60px;
          .img-cover {
            position: relative;
            width: 100%;
            height: 100%;
            span {
              width: 100% !important;
              height: 100% !important;
              img {
                border-radius: 50px;
                width: 100%;
                height: 100%;
                object-fit: cover;
                font-family: "object-fit: cover;";
                margin-left: auto;
                margin-right: auto;
              }
            }
          }
        }
      }

      .blogs-container {
        .row {
          --bs-gutter-y: 2rem;
        }
      }

      .products-container {
        .row {
          --bs-gutter-y: 2rem;
        }
      }

      .text-title {
        padding-left: 1rem;
        width: calc(100% - 60px);
        .text-price {
          font-weight: bold;
        }
      }

      .products-container {
        margin-top: 2rem;
        img {
          border-radius: 0 !important;
        }
      }
    }

    .summary-information-container {
      .img-container {
        width: 500px;
        height: 500px;
        .img-cover {
          position: relative;
          width: 100%;
          height: 100%;
          span {
            width: 100% !important;
            height: 100% !important;
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
      }

      .primary-information-container {
        .text-price {
          font-weight: bolder;
          color: red;
        }
        .sent-phone-container {
          margin-top: 0.5rem;
          padding: 1rem;
          border-radius: 6px;
          background-color: #fe4e16;
          color: white;
          .text-bold {
            font-weight: bold;
          }

          .btn-search-container {
            height: 45px;
            position: relative;
            input {
              height: 100%;
              width: calc(100% - 50px);
              border-radius: none;
              border: none;
              padding: 0 1rem;
              outline: none;
            }
            button {
              width: 50px;
              height: 100%;
              color: white;
              background-color: #fe4e16;
              border: 1px solid white;
            }
          }
        }
      }
    }

    .details-information-container {
      .detail-table-container {
        border: 1px solid #999999;
        .row {
          --bs-gutter-x: 0rem;
          div {
            padding: 1rem;
          }
        }
        .border-top-field {
          border-top: 1px solid #999999;
        }
        .border-right-field {
          border-right: 1px solid #999999;
        }
      }
    }

    .relative-products-container {
      margin-top: 2rem;
      .row {
        --bs-gutter-y: 1.5rem;
      }
    }
  }
`;
