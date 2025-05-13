import React, { useState } from "react";
import AppPagination from "../components/AppPagination";
import VerticalCard from "../components/Card/VerticalCard";
import itachiImg from "../assets/images/itachi.webp";

const comics = [
  {
    image:
      "https://i.pinimg.com/736x/e1/1a/c0/e11ac0f5655e23c127b0781d5cd0fc87.jpg",
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
    image:
      "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/168381939_215820883651914_8401945900701119093_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFyJgHqHoMYC_hA-c062bGM8UDJISpOZq3xQMkhKk5mrXZETKoysRvG7Zo0NE8SJVmVgy7XcxKDDI_Rqi7TbP8N&_nc_ohc=FLQwmPX-yLwQ7kNvwE5BKr-&_nc_oc=AdmlG37i5MeJA0Nahr7qgd_PZoDre0voECxD4GRnIvs3mqVoqnCfoNw6yY6O-SIjchI&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=9eMMHvRjL3HOmqhdP2sGHw&oh=00_AfKp1uYa33J2WrdZri7qUggMvfVRoD7GzF7xpn3QarIeIg&oe=68498DBD",
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
    image:
      "https://i.pinimg.com/736x/b2/cf/e7/b2cfe76fbfc78fc90468ab63c65bef67.jpg",
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
    image:
      "https://i.pinimg.com/736x/71/8d/2e/718d2e91155df471b20204ce61726eaf.jpg",
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
    image:
      "https://i.pinimg.com/736x/36/45/3d/36453d23b58e6465ca3f71027b06db93.jpg",
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
    image:
      "https://i.pinimg.com/736x/70/d7/ce/70d7ce03324c25b462962ad156d6b542.jpg",
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
    image:
      "https://i.pinimg.com/736x/17/27/94/172794e736e2e61246cf1ece1050f872.jpg",
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
    image:
      "https://i.pinimg.com/736x/1f/b1/54/1fb154a177c1bec5c915793ef5d77748.jpg",
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
    image:
      "https://i.pinimg.com/736x/b8/ed/0e/b8ed0ee8ed2c2820edad2e3dce6bb8f7.jpg",
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
