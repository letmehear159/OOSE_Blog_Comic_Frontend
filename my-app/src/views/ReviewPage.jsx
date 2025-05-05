import React, { useState } from "react";
import AppSidebar from "../components/Sidebar/AppSidebar";
import CardComic from "../components/Card/VerticalCard";
import AppPagination from "../components/AppPagination";

const comics = [
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Nhân Vật",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description:
      '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện",
  },
];

const ReviewPageMenu = [
  {
    label: "Thể loại truyện",
    children: [
      { label: "Action", to: "/genre/action" },
      { label: "Adventure", to: "/genre/adventure" },
      { label: "Anime", to: "/genre/anime" },
      { label: "Chuyển Sinh", to: "/genre/chuyen-sinh" },
      { label: "Comedy", to: "/genre/comedy" },
      { label: "Cổ Đại", to: "/genre/co-dai" },
      { label: "Doujinshi", to: "/genre/doujinshi" },
      { label: "Drama", to: "/genre/drama" },
      { label: "Fantasy", to: "/genre/fantasy" },
      { label: "Gender Bender", to: "/genre/gender-bender" },
      { label: "Historical", to: "/genre/historical" },
      { label: "Horror", to: "/genre/horror" },
      { label: "Live action", to: "/genre/live-action" },
      { label: "Manga", to: "/genre/manga" },
      { label: "Manhua", to: "/genre/manhua" },
      { label: "Manhwa", to: "/genre/manhwa" },
      { label: "Ngôn Tình", to: "/genre/ngon-tinh" },
      { label: "Psychological", to: "/genre/psychological" },
      { label: "Romance", to: "/genre/romance" },
      { label: "School Life", to: "/genre/school-life" },
      { label: "Sci-fi", to: "/genre/sci-fi" },
      { label: "Sports", to: "/genre/sports" },
      { label: "Supernatural", to: "/genre/supernatural" },
      { label: "Truyện Màu", to: "/genre/truyen-mau" },
    ],
  },
  { label: "Tất cả truyện", to: "/all-comics" },
];

const PAGE_SIZE = 8;

const ReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán slice dữ liệu cho trang hiện tại
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pagedComics = comics.slice(startIdx, endIdx);

  return (
    <div className="flex">
      <div className="ReviewPage-sidebar">
        <AppSidebar menuItems={ReviewPageMenu} />
      </div>
      <div className="ReviewPage-content pt-10  ">
        <div className="flex flex-wrap gap-8 justify-center">
          {pagedComics.map((comic, idx) => (
            <CardComic key={startIdx + idx} {...comic} />
          ))}
        </div>
        <div className="flex justify-center mx-10 mt-8 pb-20 ">
          <AppPagination
            current={currentPage}
            total={comics.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
