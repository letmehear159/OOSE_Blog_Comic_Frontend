import React, { useState } from "react";
import HorizontalCard from "../components/Card/HorizontalCard";
import CardTrending from "../components/Card/CardTrending";
import AppPagination from "../components/AppPagination";

const reviews = [
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title:
      "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
    authorName: "Vũ Thị Mỹ Hạnh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "27/03/2025",
    introduction: "Hẹ hẹ hẹ hẹ",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title:
      "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
    authorName: "Vũ Thị Mỹ Hạnh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "27/03/2025",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title:
      "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
    authorName: "Vũ Thị Mỹ Hạnh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "27/03/2025",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title:
      "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
    authorName: "Vũ Thị Mỹ Hạnh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "27/03/2025",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title:
      "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
    authorName: "Vũ Thị Mỹ Hạnh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "27/03/2025",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title:
      "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
    authorName: "Vũ Thị Mỹ Hạnh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "27/03/2025",
  },

  // ...
];

const topReviews = [
  {
    index: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 2,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 3,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 6,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },

  // ...
];

const PAGE_SIZE = 5;

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán slice dữ liệu cho trang hiện tại
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pagedReviews = reviews.slice(startIdx, endIdx);

  return (
    <div className="bg-gray-50 flex flex-col flex-1 min-h-screen">
      <div className="flex justify-center p-10 gap-5 mx-10 ">
        <div></div>
        <div className="w-4/6 text-black p-6 flex flex-col gap-3 items-cente h-full ">
          {pagedReviews.map((item, idx) => (
            <HorizontalCard key={startIdx + idx} {...item} />
          ))}
        </div>
        <div className=" w-2/6 h-full text-black bg-gray-100 rounded-xl p-6 flex flex-col mt-6 gap-3 items-center ">
          <h1 className="text-2xl font-bold text-red-500">Truyện nổi bật</h1>
          {topReviews.map((item, idx) => (
            <CardTrending key={idx} {...item} />
          ))}
        </div>
        <div></div>
      </div>
      <div className="flex justify-center mx-10 pb-20 ">
        <AppPagination
          current={currentPage}
          total={reviews.length}
          pageSize={PAGE_SIZE}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Homepage;
