import styled from "@emotion/styled";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { Accordion } from ".";
import { logo } from "../public/images";
import { useRouter } from "next/router";

const Header = (): JSX.Element => {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const MENU_NAVBAR = useMemo(
    () => [
      {
        name: "TRANG CHỦ",
        link: "/",
      },
      {
        name: "GIỚI THIỆU",
        link: "/introduction",
      },
      {
        name: "SẢN PHẨM CHÍNH",
        link: "/product/page/1",
      },
      {
        name: "DỊCH VỤ",
        link: "/service",
      },
      {
        name: "DỰ ÁN",
        link: "/project",
      },
    ],
    []
  );

  /**
   * Handle close menu
   * @returns void
   */
  const handleCloseSidebar = useCallback(() => {
    setOpenSidebar(false);
  }, []);

  const MENU_SIDEBAR = useMemo(
    () => [
      {
        name: "Trang chủ",
        link: "/",
      },
      {
        name: "Giới thiệu",
        link: "/",
      },
      {
        name: "Sản phẩm chính",
        link: "/",
        children: [
          {
            name: "Sản phẩm chính 1",
            link: "/",
          },
          {
            name: "Sản phẩm chính 2",
            link: "/",
          },
          {
            name: "Sản phẩm chính 3",
            link: "/",
          },
          {
            name: "Sản phẩm chính 4",
            link: "/",
          },
          {
            name: "Sản phẩm chính 5",
            link: "/",
          },
        ],
      },
      {
        name: "Dịch vụ",
        link: "/",
      },
      {
        name: "Dự án",
        link: "/",
      },
    ],
    []
  );

  const ARR_LINK_TOP = useMemo(
    () => [
      {
        name: "Trang chủ",
        link: "/",
      },
      {
        name: "Giới thiệu",
        link: "/introduction",
      },
      {
        name: "Chính sách bán hàng",
        link: "/trading-policy",
      },
      {
        name: "Blog",
        link: "/blog",
      },
      {
        name: "Liên hệ",
        link: "/contact",
      },
    ],
    []
  );

  const handleOpenSidebar = useCallback(() => {
    setOpenSidebar(true);
  }, []);

  const handleCheckActive = useCallback(
    (path: string): boolean => {
      if (router.pathname === path) {
        return true;
      }

      return false;
    },
    [router.pathname]
  );

  return useMemo(
    () => (
      <Fragment>
        <TopDivStyled>
          <Container>
            <div className="d-lg-flex d-none align-items-center justify-content-between py-1 px-5 font-14 color-white ">
              <div className="d-flex align-items-center link-container">
                {ARR_LINK_TOP.map((item, index) => (
                  <div className="ms-3" key={index}>
                    <Link href={item.link}>
                      <a
                        className={`${
                          handleCheckActive(item.link) ? "active" : ""
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="d-flex align-items-center">
                <i className="fa fa-location-dot mx-2" />
                <div>Phạm Văn Bạch, P.15, Q.Tân Bình, TP.HCM</div>
                <div className="vr mx-2" />
                <i className="fa fa-phone mx-2" />
                <span>0999.999.999</span>
              </div>
            </div>

            <div className="d-lg-none d-flex align-items-center justify-content-center py-1 px-5 font-14 color-white">
              CÔNG TY TNHH SX - TM - XNKABC
            </div>
          </Container>
        </TopDivStyled>

        <HeaderStyled className="position-sticky top-0">
          <Container>
            <div className="d-flex align-items-center justify-content-between">
              <Link href="/">
                <a>
                  <div className="logo-container">
                    <Image src={logo} alt="logo" />
                  </div>
                </a>
              </Link>

              <div className="d-lg-flex d-none align-items-center justify-content-between px-3 menu-navbar-container">
                {MENU_NAVBAR.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <a className="text-black">
                      <div
                        className={`menu-navbar-item ${
                          handleCheckActive(item.link) ? "active" : ""
                        }`}
                        key={index}
                      >
                        <span className="text-menu-item">{item.name}</span>
                        <div className="menu-item-underline" />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
              <div className="d-lg-flex d-none align-items-center">
                <Link href="tel:+84999999999">
                  <a>
                    <div className="ms-3 py-2 px-3 bg-main color-white border-radius-full">
                      0999.999.999
                    </div>
                  </a>
                </Link>
              </div>

              <div
                className="d-lg-none d-block font-24 cursor-pointer"
                onClick={handleOpenSidebar}
              >
                <i className="fa fa-bars" />
              </div>
            </div>
          </Container>
        </HeaderStyled>

        {/* Menu */}
        <OffcanvasStyled
          show={openSidebar}
          onHide={handleCloseSidebar}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Accordion expandAll options={MENU_SIDEBAR} />
          </Offcanvas.Body>
        </OffcanvasStyled>
      </Fragment>
    ),
    [
      ARR_LINK_TOP,
      MENU_NAVBAR,
      MENU_SIDEBAR,
      handleCheckActive,
      handleCloseSidebar,
      handleOpenSidebar,
      openSidebar,
    ]
  );
};

export default Header;

const TopDivStyled = styled.div`
  background-color: #fe4e16;
  .link-container {
    a {
      text-decoration: none;
      color: white;
      &.active {
        font-weight: bolder;
      }
    }
  }
`;

const HeaderStyled = styled.header`
  background-color: white;
  z-index: 99;
  font-size: 14px;
  border-bottom: 1px solid #eaeaea;
  .logo-container {
    width: 200px;
  }
  .menu-navbar-container {
    width: 50%;
    .menu-navbar-item {
      cursor: pointer;
      width: fit-content;
      position: relative;
      .menu-item-underline {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.2s linear;
        width: 100%;
        height: 3px;
        background-color: #fe4e16;
        border-radius: 5px;
      }
      &:hover {
        .menu-item-underline {
          visibility: visible;
          opacity: 1;
        }
      }
      &.active {
        .menu-item-underline {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
`;

const OffcanvasStyled = styled(Offcanvas)`
  &.offcanvas-end {
    border-left: 0px;
    .offcanvas-header {
      .btn-close {
        margin-right: -0.3rem;
        box-shadow: unset;
        background: transparent
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230858A9'%3E%3Cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3E%3C/svg%3E")
          center/1em auto no-repeat;
      }
    }
    .offcanvas-body {
      padding: 0px;
      .accordion {
        .accordion-item {
          border: 0px;
          font-size: 14px;
          .accordion-header {
            .accordion-button {
              background-color: white;
              padding: 1rem;
              color: #fe4e16;
              font-weight: 700;
              font-size: 14px;
              &:focus {
                box-shadow: unset;
              }
              &:not(.collapsed) {
                box-shadow: unset;
              }

              &::after {
                width: 1.25rem;
                height: 1.25rem;
                background-image: url("data:image/svg+xml,%3Csvg width='40' height='39' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.15817 10.6678C8.20819 10.6146 8.2676 10.5724 8.33301 10.5436C8.39842 10.5148 8.46854 10.5 8.53936 10.5C8.61018 10.5 8.6803 10.5148 8.74571 10.5436C8.81112 10.5724 8.87053 10.6146 8.92055 10.6678L15.0001 17.1199L21.0797 10.6678C21.1298 10.6147 21.1892 10.5726 21.2546 10.5438C21.32 10.5151 21.3901 10.5003 21.4609 10.5003C21.5317 10.5003 21.6018 10.5151 21.6672 10.5438C21.7326 10.5726 21.7921 10.6147 21.8421 10.6678C21.8922 10.721 21.9319 10.784 21.959 10.8534C21.9861 10.9228 22 10.9972 22 11.0723C22 11.1474 21.9861 11.2218 21.959 11.2912C21.9319 11.3606 21.8922 11.4237 21.8421 11.4768L15.3813 18.3322C15.3313 18.3854 15.2719 18.4276 15.2065 18.4564C15.1411 18.4852 15.071 18.5 15.0001 18.5C14.9293 18.5 14.8592 18.4852 14.7938 18.4564C14.7284 18.4276 14.669 18.3854 14.619 18.3322L8.15817 11.4768C8.10804 11.4237 8.06826 11.3607 8.04111 11.2913C8.01397 11.2219 8 11.1474 8 11.0723C8 10.9972 8.01397 10.9228 8.04111 10.8533C8.06826 10.7839 8.10804 10.7209 8.15817 10.6678Z' fill='%230858A9'/%3E%3C/svg%3E%0A");
              }
            }
          }
          .accordion-collapse {
            .accordion-body {
              padding: 0rem 1rem;
            }
          }
        }
      }
      .link-child-container {
        height: 48px;
        &.no-border {
          border-bottom: 0px;
        }
      }
    }
  }
  .btn-logout-container {
    right: 60px;
  }
`;
