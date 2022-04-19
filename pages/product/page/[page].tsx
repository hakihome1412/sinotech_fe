import styled from "@emotion/styled";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Offcanvas,
  Row,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { CartProduct } from "../../../components";
import { Variables } from "../../../constants";
import { ProductItem, CategoryItem, VendorItem } from "../../../models";
import { sanityClient } from "../../../sanity";
import { Formik } from "formik";

type Props = {
  products: ProductItem[];
  categories: CategoryItem[];
  total: number;
  vendors: VendorItem[];
};

type SearchForm = {
  search: string;
};

const Products: NextPage<Props> = (props: Props) => {
  const { products, total, categories, vendors } = props;
  const router = useRouter();
  const [openSidebarFilter, setOpenSidebarFilter] = useState<boolean>(false);

  const INITIAL_VALUES: SearchForm = useMemo(
    () => ({
      search: String(router.query.search || ""),
    }),
    [router.query.search]
  );

  /**
   * Handle change page
   * @param selectedItem { selected: number }
   * @return void
   */
  const handlePageClick = useCallback(
    (selectedItem: { selected: number }) => {
      router.push(`/product/page/${selectedItem.selected + 1}`);
    },
    [router]
  );

  /**
   * Handle submit form search
   * @param values SearchForm
   * @return void
   */
  const handleSubmitForm = useCallback(
    (values: SearchForm) => {
      router.push({
        pathname: "/product/page/[page]",
        query: { ...router.query, search: values.search },
      });
    },
    [router]
  );

  /**
   * Handle change order list product
   * @param values SearchForm
   * @return void
   */
  const handleChangeOrder = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      // 1 : default
      // 2 : price ASC (low to high)
      // 3 : price DESC (high to low)

      router.push({
        pathname: "/product/page/[page]",
        query: { ...router.query, orderby: e.target.value },
      });
    },
    [router]
  );

  /**
   * Handle close menu filter
   * @returns void
   */
  const handleCloseSidebar = useCallback(() => {
    setOpenSidebarFilter(false);
  }, []);

  /**
   * Handle open menu filter
   * @returns void
   */
  const handleOpenSidebar = useCallback(() => {
    setOpenSidebarFilter(true);
  }, []);

  return useMemo(
    () => (
      <ProductsStyled>
        <div className="breadcrumb-container">
          <Container>
            <div className="d-block d-md-flex align-items-center justify-content-between">
              <div>
                <Link href="/">
                  <a className="breadcrumb-custom-item">TRANG CHỦ</a>
                </Link>{" "}
                /{" "}
                <Link href="/">
                  <a className="breadcrumb-custom-item">SẢN PHẨM</a>
                </Link>{" "}
                /{" "}
                <Link href="/">
                  <a className="breadcrumb-custom-item active">TRANG 1</a>
                </Link>
              </div>

              <div className="select-order-container mt-3 mt-md-0">
                <Form.Select
                  onChange={handleChangeOrder}
                  value={Number(router.query.orderby)}
                >
                  <option value={1}>Thứ tự mặc định</option>
                  <option value={2}>Thứ tự theo giá: thấp đến cao</option>
                  <option value={3}>Thứ tự theo giá: cao đến thấp</option>
                </Form.Select>
              </div>

              <div className="mt-3 d-flex d-md-none">
                <Button className="mx-auto" onClick={handleOpenSidebar}>
                  <span>
                    LỌC <i className="fa fa-filter" />
                  </span>
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <div className="body-content-container">
          <Container>
            <Row>
              <Col lg={3} className="d-none d-lg-block">
                <Formik
                  initialValues={INITIAL_VALUES}
                  onSubmit={handleSubmitForm}
                >
                  {({ values, handleChange, handleSubmit }): JSX.Element => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                      <div className="btn-search-container">
                        <input
                          placeholder="Tìm kiếm ..."
                          name="search"
                          value={values.search}
                          onChange={handleChange}
                        />
                        <button type="submit">
                          <i className="fa fa-search" />
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

                <div className="mt-4">
                  <h5>DANH MỤC SẢN PHẨM</h5>

                  <div className="mt-2">
                    <ListGroup variant="flush">
                      {categories.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Link
                            href={`/product/page/1?category=${item.slug.current}`}
                          >
                            <a>
                              <div
                                className={`d-flex align-items-center justify-content-between ${
                                  item.slug.current === router.query.category
                                    ? "category-active"
                                    : ""
                                }`}
                              >
                                <span>{item.title}</span>
                                <span>({item.countProducts})</span>
                              </div>
                            </a>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </div>

                <div className="mt-4">
                  <h5>THƯƠNG HIỆU</h5>

                  <div className="mt-2">
                    <ListGroup variant="flush">
                      {vendors.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Link
                            href={`/product/page/1?vendor=${item.slug.current}`}
                          >
                            <a>
                              <div
                                className={`d-flex align-items-center justify-content-between ${
                                  item.slug.current === router.query.vendor
                                    ? "vendor-active"
                                    : ""
                                }`}
                              >
                                <span>{item.title}</span>
                                <span>({item.countProducts})</span>
                              </div>
                            </a>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col md={12} lg={9}>
                {!products.length ? (
                  <h3>Không tìm thấy kết quả</h3>
                ) : (
                  <div>
                    <div className="list-product-container">
                      <Row>
                        {products.map((item, index) => (
                          <Col xs={12} md={6} lg={4} key={index}>
                            <CartProduct data={item} />
                          </Col>
                        ))}
                      </Row>
                    </div>

                    <div className="d-flex justify-content-center mt-5">
                      <ReactPaginate
                        forcePage={Number(router.query.page) - 1}
                        renderOnZeroPageCount={null as any}
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={Math.ceil(
                          total / Variables.DISPLAY_ITEM_PRODUCT
                        )}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                      />
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>

        {/* Menu Filter*/}
        <OffcanvasStyled
          show={openSidebarFilter}
          onHide={handleCloseSidebar}
          placement="start"
        >
          <Offcanvas.Header closeButton />
          <Offcanvas.Body>
            <div>
              <Formik
                initialValues={INITIAL_VALUES}
                onSubmit={handleSubmitForm}
              >
                {({ values, handleChange, handleSubmit }): JSX.Element => (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <div className="btn-search-container">
                      <input
                        placeholder="Tìm kiếm ..."
                        name="search"
                        value={values.search}
                        onChange={handleChange}
                      />
                      <button type="submit">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="mt-4">
                <h5>DANH MỤC SẢN PHẨM</h5>

                <div className="mt-2">
                  <ListGroup variant="flush">
                    {categories.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Link
                          href={`/product/page/1?category=${item.slug.current}`}
                        >
                          <a>
                            <div
                              className={`d-flex align-items-center justify-content-between ${
                                item.slug.current === router.query.category
                                  ? "category-active"
                                  : ""
                              }`}
                            >
                              <span>{item.title}</span>
                              <span>({item.countProducts})</span>
                            </div>
                          </a>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </div>

              <div className="mt-4">
                <h5>THƯƠNG HIỆU</h5>

                <div className="mt-2">
                  <ListGroup variant="flush">
                    {vendors.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Link
                          href={`/product/page/1?vendor=${item.slug.current}`}
                        >
                          <a>
                            <div
                              className={`d-flex align-items-center justify-content-between ${
                                item.slug.current === router.query.vendor
                                  ? "vendor-active"
                                  : ""
                              }`}
                            >
                              <span>{item.title}</span>
                              <span>({item.countProducts})</span>
                            </div>
                          </a>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </OffcanvasStyled>
      </ProductsStyled>
    ),
    [
      INITIAL_VALUES,
      categories,
      handleChangeOrder,
      handlePageClick,
      handleSubmitForm,
      products,
      router.query.category,
      router.query.orderby,
      router.query.page,
      router.query.vendor,
      total,
      vendors,
      handleCloseSidebar,
      openSidebarFilter,
      handleOpenSidebar,
    ]
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}: GetServerSidePropsContext) => {
  const page: number = Number(params?.page) || 1;
  const offset = (page - 1) * Variables.DISPLAY_ITEM_PRODUCT;

  const queryProducts = `*[_type == 'product'][${offset}...${
    Variables.DISPLAY_ITEM_PRODUCT * page
  }]`;

  const queryCount = `*[_type == 'product']{ _id, title, slug, price, logo }`;
  const queryCategories = `*[_type == 'category']{ _id, title, slug, "countProducts" : count(*[_type == 'product' && references(^._id)])}`;
  const queryVendors = `*[_type == 'vendor']{ _id, title, slug, "countProducts" : count(*[_type == 'product' && references(^._id)])}`;

  const productData: ProductItem[] = await sanityClient.fetch(queryProducts);
  const productsAll: ProductItem[] = await sanityClient.fetch(queryCount);
  const categories: CategoryItem[] = await sanityClient.fetch(queryCategories);
  const vendors: VendorItem[] = await sanityClient.fetch(queryVendors);

  const total: number = productsAll.length || 0;

  let products: ProductItem[] = [];

  if (query.category) {
    const categoryFind = categories.find(
      (item) => item.slug.current === query.category
    );

    if (categoryFind) {
      productData.forEach((item) => {
        item.categories?.forEach((itemCategory) => {
          if (itemCategory._ref === categoryFind._id) {
            products.push(item);
          }
        });
      });
    }
  } else if (query.vendor) {
    const vendor = vendors.find((item) => item.slug.current === query.vendor);

    if (vendor) {
      productData.forEach((item) => {
        if (item.vendor!._ref === vendor._id) {
          products.push(item);
        }
      });
    }
  } else {
    products = [...productData];
  }

  if (query.search) {
    products = products.filter(
      (item) =>
        item.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            String(query.search)
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          ) || String(item.price).includes(String(query.search).toLowerCase())
    );
  }

  if (query.orderby) {
    // 1 : default
    // 2 : price ASC (low to high)
    // 3 : price DESC (high to low)

    switch (Number(query.orderby)) {
      case 2:
        products.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 3:
        products.sort((a, b) => Number(b.price) - Number(a.price));
        break;
    }
  }

  return {
    props: {
      products,
      total,
      categories,
      vendors,
    },
  };
};

const ProductsStyled = styled.div`
  .breadcrumb-container {
    padding: 1rem;
    color: white;
    background-color: #fe4e16;
    .breadcrumb-custom-item {
      &.active {
        font-weight: bold;
      }
    }
    .select-order-container {
      .form-select {
        background-color: #fd7e14;
        border: none;
        height: 50px;
        border-radius: 50px;
        color: white;
      }
    }
  }

  .body-content-container {
    margin: 2rem 0;
    .list-product-container {
      .row {
        --bs-gutter-y: 1.5rem;
      }
    }

    .vendor-active {
      color: #fd7e14;
    }

    .category-active {
      color: #fd7e14;
    }

    .btn-search-container {
      height: 50px;
      position: relative;
      input {
        height: 100%;
        width: calc(100% - 50px);
        border-radius: none;
        border: 1px solid #999999;
        padding: 0 1rem;
        outline: none;
      }
      button {
        width: 50px;
        height: 100%;
        color: white;
        background-color: #fe4e16;
        border: none;
      }
    }
  }
`;

const OffcanvasStyled = styled(Offcanvas)`
  .offcanvas-body {
    .vendor-active {
      color: #fd7e14;
    }

    .category-active {
      color: #fd7e14;
    }

    .btn-search-container {
      height: 50px;
      position: relative;
      input {
        height: 100%;
        width: calc(100% - 50px);
        border-radius: none;
        border: 1px solid #999999;
        padding: 0 1rem;
        outline: none;
      }
      button {
        width: 50px;
        height: 100%;
        color: white;
        background-color: #fe4e16;
        border: none;
      }
    }
  }
`;
