/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { BlogItem } from "../models";
import { urlFor } from "../sanity";

type Props = {
  item: BlogItem;
};

const CartBlogMain = (props: Props): JSX.Element => {
  const { item } = props;

  return useMemo(
    () => (
      <CartBlogMainStyled>
        <div className="blog-item-main">
          <Link href={`/blog/${item.slug.current}`}>
            <a>
              <div className="img-container">
                <div className="img-cover">
                  <img
                    src={urlFor(item.logo).url()!}
                    alt="product-img"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </a>
          </Link>

          <Row className="mt-5">
            <Col sm={12} md={5}>
              <div className="title-date-container">
                <Link href={`/blog/${item.slug.current}`}>
                  <a>
                    <h1 className="text-title">{item.title}</h1>
                  </a>
                </Link>
                <span>{new Date(item._createdAt).toLocaleString()}</span>
              </div>
            </Col>
            <Col sm={12} md={7}>
              <div className="content no-margin-top">{item.blurb}</div>
              <div className="d-flex align-items-center mt-3">
                <div className="logo-container">
                  <div className="img-cover">
                    <img
                      src="/favicon.ico"
                      alt="product-img"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>

                <h5 className="ms-3">Sinotech Team</h5>
              </div>
            </Col>
          </Row>
        </div>
      </CartBlogMainStyled>
    ),
    [item._createdAt, item.blurb, item.logo, item.slug, item.title]
  );
};

export default CartBlogMain;

const CartBlogMainStyled = styled.div`
  .blog-item-main {
    margin-top: 2rem;
    .content {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      margin-top: 0.8rem;
      &.no-margin-top {
        margin-top: 0;
      }
    }
    .text-title {
      color: black;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
