import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { BlogItem } from "../models";
import { urlFor } from "../sanity";

type Props = {
  item: BlogItem;
};

const CartBlog = (props: Props): JSX.Element => {
  const { item } = props;

  return useMemo(
    () => (
      <CartBlogStyled className="blog-item">
        <Link href={`/blog/${item.slug.current}`}>
          <a>
            <div className="img-container">
              <div className="img-cover">
                <Image
                  src={urlFor(item.logo).url()!}
                  alt="product-img"
                  layout="fill"
                />
              </div>
            </div>
          </a>
        </Link>

        <div className="title-date-container">
          <Link href={`/blog/${item.slug.current}`}>
            <a>
              <h3 className="text-title mt-2">{item.title}</h3>
            </a>
          </Link>
          <span>{new Date(item._createdAt).toLocaleString()}</span>
        </div>

        <div className="content">{item.blurb}</div>
        <div className="d-flex align-items-center mt-3">
          <div className="logo-container">
            <div className="img-cover">
              <Image src="/favicon.ico" alt="product-img" layout="fill" />
            </div>
          </div>

          <h5 className="ms-3">Sinotech Team</h5>
        </div>
      </CartBlogStyled>
    ),
    [item._createdAt, item.blurb, item.logo, item.slug, item.title]
  );
};

export default CartBlog;

const CartBlogStyled = styled.div`
  &.blog-item {
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

    .img-container {
      cursor: pointer;
      width: 100%;
      height: 300px;
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
            -webkit-transition: all 1s ease;
            -moz-transition: all 1s ease;
            -ms-transition: all 1s ease;
            transition: all 1s ease;
          }
        }
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
`;
