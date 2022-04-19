/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useMemo } from "react";
import { BlogItem } from "../models";
import { urlFor } from "../sanity";

type Props = {
  item: BlogItem;
};

const CartBlogNewRightSide = (props: Props) => {
  const { item } = props;

  return useMemo(
    () => (
      <CartBlogNewRightSideStyled>
        <Link href={`/blog/${item.slug.current}`}>
          <a>
            <div className="d-flex align-items-center justify-content-between">
              <div className="img-container">
                <div className="img-cover">
                  <img
                    src={urlFor(item.logo).url()!}
                    alt="product-img"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="text-title">{item.title}</div>
            </div>
          </a>
        </Link>
      </CartBlogNewRightSideStyled>
    ),
    [item.logo, item.slug, item.title]
  );
};

export default CartBlogNewRightSide;

const CartBlogNewRightSideStyled = styled.div`
  img {
    border-radius: 100px;
  }
`;
