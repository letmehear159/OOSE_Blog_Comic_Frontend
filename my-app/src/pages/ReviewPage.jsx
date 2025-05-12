import React, { useState } from "react";
import AppSidebar from "../components/Sidebar/AppSidebar";
import VerticalCard from "../components/Card/VerticalCard";
import AppPagination from "../components/AppPagination";

const comics = [
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "14/02/2025",
    title: "Phàm Nhân Tu Tiên",
    description:
      '"Phàm Nhân Tu Tiên" kể về hành trình nghịch thiên cải mệnh của Hàn Lập.',
    tags: ["Review Truyện", "Phân Tích", "Nhân Vật"],
    types: ["Action", "Adventure", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "03/08/2024",
    title: "Tiên Nghịch",
    description:
      '"Tiên Nghịch" xoay quanh Vương Lâm và con đường tu tiên đầy bi thương.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Drama", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "26/10/2024",
    title: "Ngã Dục Phong Thiên",
    description:
      '"Ngã Dục Phong Thiên" là câu chuyện về Lâm Phàm và con đường nghịch thiên.',
    tags: ["Review Truyện", "Nhân Vật", "Phân Tích"],
    types: ["Action", "Fantasy", "Adventure"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "07/01/2025",
    title: "Tru Tiên",
    description:
      '"Tru Tiên" là hành trình tu tiên và đấu tranh nội tâm của Trương Tiểu Phàm.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Romance", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "11/03/2024",
    title: "Đấu Phá Thương Khung",
    description:
      '"Đấu Phá Thương Khung" kể về Tiêu Viêm cùng hành trình phục thù và cường hóa.',
    tags: ["Review Truyện", "Nhân Vật"],
    types: ["Action", "Adventure", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "17/06/2025",
    title: "Bách Luyện Thành Thần",
    description:
      '"Bách Luyện Thành Thần" nói về La Chinh vượt qua khó khăn để tu luyện đỉnh cao.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "22/11/2024",
    title: "Tuyệt Thế Đường Môn",
    description:
      '"Tuyệt Thế Đường Môn" là phần tiếp theo trong thế giới Đấu La, đầy hấp dẫn.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "01/05/2024",
    title: "Hệ Thống Tu Luyện Toàn Năng",
    description: '"Hệ Thống Tu Luyện Toàn Năng" theo chân nhân vật chính ',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "19/09/2024",
    title: "Đế Bá",
    description:
      '"Đế Bá" kể về Lý Thất Dạ - người sống hàng vạn năm và nắm giữ bí mật kinh thiên.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Drama", "Fantasy"],
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "06/12/2025",
    title: "Vũ Động Càn Khôn",
    description:
      '"Vũ Động Càn Khôn" xoay quanh hành trình nghịch chuyển vận mệnh của Lâm Động.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
  },
];

const ReviewPageMenu = [
  {
    label: "Thể loại truyện",
    children: [
      { label: "Action", to: "/genre/action" },
      { label: "Adventure", to: "/genre/adventure" },
      { label: "Drama", to: "/genre/drama" },
      { label: "Fantasy", to: "/genre/fantasy" },
      { label: "Romance", to: "/genre/romance" },
    ],
  },
  { label: "Tất cả truyện", to: "/all-comics" },
];

const PAGE_SIZE = 6;

const ReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const filteredComics = selectedGenre
    ? comics.filter((comic) => comic.types.includes(selectedGenre))
    : comics;

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pagedComics = filteredComics.slice(startIdx, endIdx);

  // Reset về trang đầu mỗi khi chọn thể loại mới
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full mb-15">
      <div className="ReviewPage-sidebar">
        <AppSidebar
          menuItems={ReviewPageMenu}
          onGenreSelect={handleGenreSelect}
        />
      </div>
      <div className="ReviewPage-content flex flex-col flex-1 pt-10 px-3">
        <div className="flex flex-wrap gap-5 justify-center">
          {pagedComics.length > 0 ? (
            pagedComics.map((comic, idx) => (
              <VerticalCard key={startIdx + idx} {...comic} />
            ))
          ) : (
            <p>Không có truyện nào cho thể loại này.</p>
          )}
        </div>
        <div className="flex justify-center mt-5 mb-13 pb-5">
          <AppPagination
            current={currentPage}
            total={filteredComics.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
