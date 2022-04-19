import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { Functions } from "../constants";
import { ProductItem } from "../models";
import { urlFor } from "../sanity";

type Props = {
  data: ProductItem;
};

const CartProduct = (props: Props): JSX.Element => {
  const { data } = props;
  return useMemo(
    () => (
      <CartProductStyled className="product-main-item">
        <Link href={`/product/${data.slug.current}`}>
          <a>
            <div className="img-product-container">
              <div className="img-cover">
                <Image
                  src={urlFor(data.logo).url()!}
                  alt="product-img"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            <div className="product-main-information">
              <p className="product-name">{data.title}</p>
              <span className="product-price">
                {data.price
                  ? `${Functions.NumberWithCommas(data.price)} VNĐ`
                  : "Liên hệ báo giá"}
              </span>
            </div>
          </a>
        </Link>
      </CartProductStyled>
    ),
    [data.slug, data.logo, data.title, data.price]
  );
};

export default CartProduct;

const CartProductStyled = styled.div`
  &.product-main-item {
    border: 1px solid #dddddd;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    height: 100%;

    @keyframes slide {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .img-product-container {
      position: relative;
      height: 200px;
      margin: 0 auto;
      overflow: hidden;
      .img-cover {
        position: relative;
        height: 100%;
        overflow: hidden;
        background-position: 50% 50%;
        background-size: cover;
        span {
          width: 100% !important;
          height: 100% !important;
          img {
            right: 0;
            width: 100%;
            height: 100%;
            bottom: 0;
            left: 0;
            top: 0;
            position: absolute;
            font-family: "object-fit: cover;";
            -webkit-transition: all 2s ease;
            -moz-transition: all 2s ease;
            -ms-transition: all 2s ease;
            transition: all 2s ease;
          }
        }
      }
    }

    .product-main-information {
      padding: 1rem;
      text-align: center;
      .product-name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      .product-price {
        color: red;
        font-weight: bold;
      }
    }

    &:hover {
      &::after {
        content: "";
        top: 0;
        transform: translateX(100%);
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        animation: slide 1.5s alternate;
        background: -moz-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(128, 186, 232, 0) 99%,
          rgba(125, 185, 232, 0) 100%
        ); /* FF3.6+ */
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          color-stop(0%, rgba(255, 255, 255, 0)),
          color-stop(50%, rgba(255, 255, 255, 0.8)),
          color-stop(99%, rgba(128, 186, 232, 0)),
          color-stop(100%, rgba(125, 185, 232, 0))
        ); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(128, 186, 232, 0) 99%,
          rgba(125, 185, 232, 0) 100%
        ); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(128, 186, 232, 0) 99%,
          rgba(125, 185, 232, 0) 100%
        ); /* Opera 11.10+ */
        background: -ms-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(128, 186, 232, 0) 99%,
          rgba(125, 185, 232, 0) 100%
        ); /* IE10+ */
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(128, 186, 232, 0) 99%,
          rgba(125, 185, 232, 0) 100%
        ); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 );
      }
      img {
        transform: scale(1.2);
      }
    }
  }
`;
