import React, { useState } from "react";
import AppPagination from "../components/AppPagination";
import VerticalCard from "../components/Card/VerticalCard";

const comics = [
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "15/03/2024",
    title: "Itachi Uchiha",
    description: '"Naruto Shippuden"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "02/07/2024",
    title: "Lâm Phàm",
    description: '"Ngã Dục Phong Thiên"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "22/11/2025",
    title: "Gojou Satoru",
    description: '"Jujutsu Kaisen"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "08/09/2025",
    title: "Trương Tiểu Phàm",
    description: '"Tru Tiên"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "30/12/2024",
    title: "Levi Ackerman",
    description: '"Attack on Titan"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "18/06/2024",
    title: "Vương Lâm",
    description: '"Tiên Nghịch"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "04/01/2025",
    title: "Killua Zoldyck",
    description: '"Hunter x Hunter"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "10/10/2025",
    title: "Hàn Lập",
    description: '"Phàm Nhân Tu Tiên"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "25/08/2024",
    title: "Gojo Yuujiro",
    description: '"Baki the Grappler"',
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "13/05/2024",
    title: "Đường Tam",
    description: '"Đấu La Đại Lục"',
  },
];
const PAGE_SIZE = 10;

const CharacterPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Lấy slice dữ liệu cho trang hiện tại
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pagedComics = comics.slice(startIdx, endIdx);

  return (
    <div className="CharacterPage-content flex flex-col flex-1 p-10 m-5">
      <div className="flex flex-wrap gap-8 justify-center">
        {pagedComics.map((comic, idx) => (
          <VerticalCard key={startIdx + idx} {...comic} />
        ))}
      </div>
      <div className="flex justify-center mt-5 mb-8">
        <AppPagination
          current={currentPage}
          total={comics.length}
          pageSize={PAGE_SIZE}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CharacterPage;
