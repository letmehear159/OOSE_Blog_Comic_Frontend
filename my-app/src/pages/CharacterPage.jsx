import React, { useState } from "react";
import AppPagination from "../components/AppPagination";
import VerticalCard from "../components/Card/VerticalCard";
import itachiImg from "../assets/images/itachi.webp";

const comics = [
  {
    image: itachiImg,
    date: "15/03/2024",
    title: "Itachi Uchiha",
    description: '"Naruto Shippuden"',
    rate: 4.9,
    rateCount: 2500,
    commentCount: 450,
    saveCount: 890,
    viewCount: 25000,
  },
  {
    image: itachiImg,
    date: "02/07/2024",
    title: "Lâm Phàm",
    description: '"Ngã Dục Phong Thiên"',
    rate: 4.7,
    rateCount: 1800,
    commentCount: 320,
    saveCount: 650,
    viewCount: 18000,
  },
  {
    image: itachiImg,
    date: "22/11/2025",
    title: "Gojou Satoru",
    description: '"Jujutsu Kaisen"',
    rate: 4.8,
    rateCount: 2200,
    commentCount: 380,
    saveCount: 720,
    viewCount: 22000,
  },
  {
    image: itachiImg,
    date: "08/09/2025",
    title: "Trương Tiểu Phàm",
    description: '"Tru Tiên"',
    rate: 4.6,
    rateCount: 1600,
    commentCount: 290,
    saveCount: 580,
    viewCount: 16000,
  },
  {
    image: itachiImg,
    date: "30/12/2024",
    title: "Levi Ackerman",
    description: '"Attack on Titan"',
    rate: 4.9,
    rateCount: 2400,
    commentCount: 420,
    saveCount: 850,
    viewCount: 24000,
  },
  {
    image: itachiImg,
    date: "18/06/2024",
    title: "Vương Lâm",
    description: '"Tiên Nghịch"',
    rate: 4.7,
    rateCount: 1900,
    commentCount: 340,
    saveCount: 680,
    viewCount: 19000,
  },
  {
    image: itachiImg,
    date: "04/01/2025",
    title: "Killua Zoldyck",
    description: '"Hunter x Hunter"',
    rate: 4.8,
    rateCount: 2100,
    commentCount: 360,
    saveCount: 750,
    viewCount: 21000,
  },
  {
    image: itachiImg,
    date: "10/10/2025",
    title: "Hàn Lập",
    description: '"Phàm Nhân Tu Tiên"',
    rate: 4.6,
    rateCount: 1700,
    commentCount: 310,
    saveCount: 620,
    viewCount: 17000,
  },
  {
    image: itachiImg,
    date: "25/08/2024",
    title: "Gojo Yuujiro",
    description: '"Baki the Grappler"',
    rate: 4.5,
    rateCount: 1500,
    commentCount: 280,
    saveCount: 550,
    viewCount: 15000,
  },
  {
    image: itachiImg,
    date: "13/05/2024",
    title: "Đường Tam",
    description: '"Đấu La Đại Lục"',
    rate: 4.7,
    rateCount: 2000,
    commentCount: 350,
    saveCount: 700,
    viewCount: 20000,
  },
];
const PAGE_SIZE = 6;

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
