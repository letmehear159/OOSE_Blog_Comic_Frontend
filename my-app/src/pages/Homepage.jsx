import React, { useState } from "react";
import HorizontalCard from "../components/Card/HorizontalCard";
import CardTrending from "../components/Card/CardTrending";
import AppPagination from "../components/AppPagination";
import DisplayAuthorInfo from "../components/DisplayAuthorInfor";

const reviews = [
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title:
      "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
    description:
      "Khám phá thế giới phép thuật độc đáo của MASHLE, nơi sức mạnh cơ bắp đối đầu với ma thuật. Một câu chuyện hài hước và đầy bất ngờ về hành trình của Mash Burnedead.",
    authorName: "Vũ Thị Mỹ Hạnh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "27/03/2025",
    rate: 4.8,
    rateCount: 156,
    commentCount: 45,
    saveCount: 89,
    viewCount: 2345,
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "[Review] One Piece | Hành trình tìm kiếm kho báu của Luffy",
    description:
      "Theo chân Monkey D. Luffy và băng hải tặc Mũ Rơm trong cuộc phiêu lưu tìm kiếm kho báu One Piece. Một câu chuyện về tình bạn, ước mơ và sự dũng cảm.",
    authorName: "Nguyễn Văn A",
    authorAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
    date: "26/03/2025",
    rate: 4.9,
    rateCount: 289,
    commentCount: 78,
    saveCount: 156,
    viewCount: 5678,
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "[Review] Naruto | Câu chuyện về ninja huyền thoại",
    description:
      "Hành trình trở thành Hokage của Uzumaki Naruto - cậu bé ninja đầy nghị lực. Một câu chuyện về sự kiên trì, tình bạn và sức mạnh của ý chí.",
    authorName: "Trần Thị B",
    authorAvatar: "https://randomuser.me/api/portraits/women/34.jpg",
    date: "25/03/2025",
    rate: 4.7,
    rateCount: 234,
    commentCount: 67,
    saveCount: 123,
    viewCount: 3456,
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "[Review] Attack on Titan | Bi kịch của nhân loại",
    description:
      "Trong thế giới nơi loài người bị đe dọa bởi Titan, Eren Yeager và những người bạn chiến đấu để bảo vệ nhân loại. Một câu chuyện đầy bi kịch và bất ngờ.",
    authorName: "Lê Văn C",
    authorAvatar: "https://randomuser.me/api/portraits/men/35.jpg",
    date: "24/03/2025",
    rate: 4.6,
    rateCount: 198,
    commentCount: 56,
    saveCount: 98,
    viewCount: 2789,
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "[Review] Demon Slayer | Cuộc chiến chống quỷ",
    description:
      "Tanjiro Kamado bắt đầu hành trình trở thành Kiếm Sĩ Diệt Quỷ để cứu em gái và trả thù cho gia đình. Một câu chuyện về tình thân và lòng dũng cảm.",
    authorName: "Phạm Thị D",
    authorAvatar: "https://randomuser.me/api/portraits/women/36.jpg",
    date: "23/03/2025",
    rate: 4.5,
    rateCount: 167,
    commentCount: 45,
    saveCount: 87,
    viewCount: 2345,
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "[Review] Jujutsu Kaisen | Thế giới phép thuật hiện đại",
    description:
      "Yuji Itadori bước vào thế giới của các pháp sư Jujutsu và lời nguyền. Một câu chuyện về sức mạnh, trách nhiệm và sự hy sinh.",
    authorName: "Hoàng Văn E",
    authorAvatar: "https://randomuser.me/api/portraits/men/37.jpg",
    date: "22/03/2025",
    rate: 4.4,
    rateCount: 145,
    commentCount: 34,
    saveCount: 76,
    viewCount: 1987,
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
      <div className="flex justify-center p-10">
        <div></div>
        <div className="w-4/6 text-black p-6 flex flex-col gap-3 items-center h-full">
          {pagedReviews.map((item, idx) => (
            <HorizontalCard key={startIdx + idx} {...item} />
          ))}
        </div>
        <div className="w-2/6 w-xs h-full text-black bg-gray-100 rounded-xl flex text-center flex-col mt-6 gap-3 items-center ml-10 p-3">
          <h1 className="text-2xl font-bold text-red-500 pt-6">
            Truyện nổi bật
          </h1>
          {topReviews.map((item, idx) => (
            <CardTrending key={idx} {...item} />
          ))}
        </div>
        <div></div>
      </div>
      <div className="flex justify-center mx-10 pb-20">
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
