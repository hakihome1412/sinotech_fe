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

const CartProductNewRightSide = (props: Props): JSX.Element => {
  const { data } = props;

  return useMemo(
    () => (
      <CartProductNewRightSideStyled>
        <Link href={`/product/${data.slug.current}`}>
          <a>
            <div className="d-flex align-items-center justify-content-between">
              <div className="img-container">
                <div className="img-cover">
                  <Image
                    src={urlFor(data.logo).url()!}
                    alt="product-img"
                    layout="fill"
                  />
                </div>
              </div>
              <div className="text-title">
                <span>{data.title}</span>
                <p className="text-price">
                  {data.price
                    ? `${Functions.NumberWithCommas(data.price)} VNĐ`
                    : "Liên hệ báo giá"}
                </p>
              </div>
            </div>
          </a>
        </Link>
      </CartProductNewRightSideStyled>
    ),
    [data.logo, data.price, data.slug, data.title]
  );
};

export default CartProductNewRightSide;

const CartProductNewRightSideStyled = styled.div`
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
          -webkit-transition: all 1s ease;
          -moz-transition: all 1s ease;
          -ms-transition: all 1s ease;
          transition: all 1s ease;
        }
      }
    }
  }
  .text-title {
    padding-left: 1rem;
    width: calc(100% - 60px);
    .text-price {
      font-weight: bold;
    }
  }

  &:hover {
    img {
      transform: scale(1.2);
    }
  }
`;
