/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import { GetServerSideProps, NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CartBlog, CartBlogMain } from "../../components";
import { BlogItem } from "../../models";
import { sanityClient } from "../../sanity";

type Props = {
  blogs: BlogItem[];
  total: number;
};

const Blogs: NextPage<Props> = (props: Props) => {
  const { blogs, total } = props;
  const QUANTITY_ITEM_SHOW_DEFAULT = 7;
  const [dataBlogShow, setDataBlogShow] = useState<BlogItem[]>([]);

  /**
   * Handle show more blog
   * @return void
   */
  const handleShowMoreBlog = useCallback(
    (startIndex: number) => () => {
      const arrAdd: BlogItem[] = [];

      for (
        let i = startIndex;
        i < startIndex + QUANTITY_ITEM_SHOW_DEFAULT;
        i++
      ) {
        if (blogs[i]) arrAdd.push(blogs[i]);
      }

      setDataBlogShow((oldData) => [...oldData, ...arrAdd]);
    },
    [blogs]
  );

  useEffect(() => {
    handleShowMoreBlog(0)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => (
      <Container>
        <BlogsStyled className="blog-container">
          <div className="d-lg-flex d-sm-block align-items-center justify-content-between mb-5">
            <div className="text-title-blog">Blog.</div>
            <span className="ms-lg-5 w-75">
              Blog chia sẻ kinh nghiệm sửa chữa các loại máy công nghiệp mà Hưng
              Thịnh Phát đang cung cấp như: Biến tần, Máy nén khí, Máy phát
              điện,.. những tin tức xoay quanh chỉ đề hay những tư vấn để thuận
              tiện nhất cho bạn đọc, khách hàng tham khảo. Rất mong nhận được
              nhiều đóng góp để blog đầy đủ hơn.
            </span>
          </div>
          <Row>
            {dataBlogShow.map((item, index) =>
              index === 0 ? (
                <CartBlogMain item={item} key={index} />
              ) : (
                <Col sm={12} md={6} lg={4} key={index}>
                  <CartBlog item={item} />
                </Col>
              )
            )}
          </Row>

          {blogs.length > dataBlogShow.length && (
            <div className="d-flex">
              <Button
                variant="primary"
                className="mt-4 mx-auto"
                onClick={handleShowMoreBlog(dataBlogShow.length - 1)}
              >
                Xem thêm
              </Button>
            </div>
          )}
        </BlogsStyled>
      </Container>
    ),
    [blogs.length, dataBlogShow, handleShowMoreBlog]
  );
};

export default Blogs;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryBlog = `*[_type == 'blog']`;

  const blogs: BlogItem[] = await sanityClient.fetch(queryBlog);

  const total: number = blogs.length || 0;

  return {
    props: {
      blogs,
      total,
    },
  };
};

const BlogsStyled = styled.div`
  &.blog-container {
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
  }
`;
