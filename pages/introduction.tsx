import styled from "@emotion/styled";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { Container } from "react-bootstrap";
import { banner1 } from "../public/images";

const IntroductionPage: NextPage = () => {
  return useMemo(
    () => (
      <Container>
        <IntroductionPageStyled className="mt-4">
          <Image src={banner1} alt="product-img" layout="responsive" />
          <h3 className="text-bolder color-primary text-center mt-5">
            Hưng Thịnh Phát là công ty cung cấp máy phát điện cummins nhập khẩu
            uy tín nhất
          </h3>{" "}
          <p>
            Máy phát điện Cummins có chất lượng siêu bền, có động cơ mạnh mẽ,
            vận hành lâu dài và hiệu quả, có kết cấu nhỏ gọn, dễ di chuyển, ít
            tiêu hao nhiên liệu. Do đó đem lại hiệu quả kinh tế cao cho người sử
            dụng.
          </p>
          <h4 className="text-bolder">
            Xuất xứ máy phát điện công nghiệp cummins tại Hưng Thịnh Phát
          </h4>{" "}
          <p>
            Mọi người thường phân vân máy phát điện Cummins của nước nào ? Dựa
            trên nguồn gốc sản xuất, tại thị trường Việt Nam hiện nay chia làm 2
            dòng máy chính:
          </p>{" "}
          <ul>
            <li>
              <span className="text-bold">
                Máy phát điện công nghiệp Cummins
              </span>{" "}
              sản xuất tại Mỹ, Anh, Nhật Bản. Loại máy này có hiệu suất làm việc
              cao, chất lượng tốt, tiêu chuẩn đảm bảo môi trường Châu Âu . Đầu
              phát thường dùng là loại Stanford.
            </li>
            <li>
              <span className="text-bold">Máy Cummins</span> sản xuất tại Trung
              Quốc. Loại này chất lượng kém hơn động cơ Cummins sản xuất tại Mỹ,
              Nhật Bản, Anh. Đầu phát do các đơn vị Trung Quốc sản xuất lắp ráp
              nên có giá thành thấp hơn nhiều so với các máy phát điện cùng loại
              khác. Tuy nhiên vẫn đảm bảo được công suất hoạt động tốt và vận
              hành ổn định.
            </li>
          </ul>
          <p>
            Chất lượng điện áp phát ra tuân theo các tiêu chuẩn và quy cách như
            CEI 2-3, IEC 34-1, EN14214, VDE 0530, BS 5514-1, CAN/CSA – C22.2
          </p>
          <h4 className="text-bolder">
            Công ty chúng tôi là đơn vị đại lý nhập khẩu máy phát điện tại tphcm
            hàng đầu
          </h4>
          <ul className="feel-good-container">
            <li>
              Máy chất lượng tốt, đạt độ bền cao , chịu được điều kiện vận hành
              liên tục.
            </li>
            <li>Vận hành tốt và dễ sử dụng.</li>
            <li>Hiệu suất công việc cao.</li>
            <li>Tiết kiệm nhiên liệu.</li>
            <li>
              Theo tiêu chuẩn của nhà sản xuất dòng máy phát điện nhật để sản
              sinh ra 1kw điện trong 1 giờ lượng dầu diezen tiêu thụ là 210g.
              Lượng nhiên liệu tiêu thụ phụ thuộc vào mức độ tải của tổ máy.
            </li>
            <li>
              Giá thành hợp lý, tương đối thấp hơn các dòng máy phát điện của
              các nước Mỹ, Pháp…
            </li>
            <li>
              Được sản xuất bởi các hãng công nghiệp nổi tiếng của Nhật
              Bản,Anh,Đức, Hàn Quốc… như: Cummins, Perkins, Mitsubishi, Huyndai,
              Doosan, Weichai…
            </li>
          </ul>
          <h4 className="text-bolder">
            Các hãng máy phát điện khác Hưng Thịnh Phát hiện đang cung cấp
          </h4>
          Ngoài máy phát điện Cummins , Công ty Hưng Thịnh Phát hân hạnh cung
          cấp các dòng máy phát điện khác nhau nhập khẩu để khách hàng có nhiều
          sự lựa chọn như:
          <ul>
            <li>
              <span className="text-bold">Máy phát điện Deutz</span> được nhập
              khẩu từ Đức.
            </li>
            <li>
              <span className="text-bold">Máy phát điện Hyundai</span> được nhập
              khẩu từ Hàn Quốc.
            </li>
            <li>
              <span className="text-bold">Máy phát điện Mitsubishi</span> được
              nhập khẩu từ Nhật Bản.
            </li>
            <li>
              <span className="text-bold">Máy phát điên Weichai</span> được nhâp
              khẩu từ Trung Quốc.
            </li>
            <li>
              <span className="text-bold">Máy phát điện Doosan</span> được nhập
              khẩu từ Hàn Quốc…
            </li>
          </ul>
          <p>
            Ngoài việc cung cấp nhiều dạng máy phát điện công nghiệp , Máy phát
            điện Hưng Thịnh Phát còn cung cấp các dịch vụ bảo trì, sửa chữa,{" "}
            <span className="text-bold">cho thuê máy phát điện</span> với chất
            lượng tốt và giá thành canh tranh.
          </p>
          <p>
            Quý khách hàng có thể tham khảo thêm về các công trình mà chúng tôi
            đã lắp đặt bảo trì bão dưỡng{" "}
            <Link href="/">
              <a className="text-service color-primary text-bold">tại đây</a>
            </Link>
          </p>
          <p>
            Hãy nhấc máy và gọi ngay cho chúng tôi để lựa chọn cho mình mẫu{" "}
            <span className="text-bold">
              máy phát điện Cummins Việt Name chính hãng
            </span>{" "}
            tốt nhất .
          </p>
          <p className="text-bold">Rất hân hạnh được phục vụ quý khách!!!</p>
        </IntroductionPageStyled>
      </Container>
    ),
    []
  );
};

export default IntroductionPage;

const IntroductionPageStyled = styled.div`
  .color-primary {
    color: #fe4e16;
  }

  .text-bold {
    font-weight: bold;
  }

  .text-bolder {
    font-weight: bolder;
  }

  .text-service {
    transition: 0.3s;
    &:hover {
      color: blue;
    }
  }

  .feel-good-container {
    list-style-type: square;
  }
`;
