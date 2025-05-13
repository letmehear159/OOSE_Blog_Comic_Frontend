import React, { useState } from "react";
import HorizontalCard from "../components/Card/HorizontalCard";
import CardTrending from "../components/Card/CardTrending";
import AppPagination from "../components/AppPagination";
import PostActions from "../components/PostActions";

const reviews = [
  {
    image: "https://mashle.pw/teaser/img/common/og-image2.png?v=0.01",
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
    image:
      "https://images-cdn.ubuy.co.in/633ff507f2c2205fdc02a68b-one-piece-poster-bathroom-decor-anime.jpg",
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
    image:
      "https://product.hstatic.net/200000343865/product/tuyen-tap-tranh-masashi-kishimoto---uzumaki-naruto---artbook-naruto_97a974e02df3425190436ac7da622711.jpg",
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
    image:
      "https://i5.walmartimages.com/seo/Attack-on-Titan-Season-3-Key-Art-Wall-Poster-22-375-x-34_f002ede2-a2f0-4a7a-9205-98e9ce384008.dd678b04443e2bed5b423b794b465e6a.jpeg",
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
    image: "https://m.media-amazon.com/images/I/71m+TO40vWL._AC_SL1200_.jpg",
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
    image:
      "https://thecomicbookstore.in/wp-content/uploads/2022/09/TCBS2515-1-scaled.jpg",
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
    title:
      "Phân tích sâu về nhân vật Itachi Uchiha - Bi kịch của một thiên tài",
    date: "15/03/2024",
  },
  {
    index: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Levi Ackerman: Người mạnh nhất của nhân loại trong Attack on Titan",
    date: "14/03/2024",
  },
  {
    index: 3,
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    title: "Gojou Satoru - Sức mạnh và sự cô độc của kẻ mạnh nhất",
    date: "13/03/2024",
  },
  {
    index: 4,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    title: "Killua Zoldyck: Hành trình từ sát thủ đến người bạn thân thiết",
    date: "12/03/2024",
  },
  {
    index: 5,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    title: "Vương Lâm: Con đường tu tiên đầy chông gai trong Tiên Nghịch",
    date: "11/03/2024",
  },
  {
    index: 6,
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    title: "Luffy - Hành trình trở thành Vua Hải Tặc trong One Piece",
    date: "10/03/2024",
  },
];

const PAGE_SIZE = 5;

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pagedReviews = reviews.slice(startIdx, endIdx);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white flex flex-col flex-1 min-h-screen">
      <div className="flex justify-center p-8">
        <div className="w-4/6 text-black flex flex-col gap-6 items-center h-full">
          {pagedReviews.map((item, idx) => (
            <HorizontalCard key={startIdx + idx} {...item} />
          ))}
        </div>
        <div className="w-2/6 h-full text-black bg-white rounded-2xl shadow-sm flex flex-col mt-6 gap-4 items-center ml-8 p-6 border border-gray-100">
          <div className="w-full">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent pb-2">
              Truyện nổi bật
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-6"></div>
          </div>
          <div className="w-full space-y-3">
            {topReviews.map((item, idx) => (
              <CardTrending key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-10 pb-20">
        <div>
          <AppPagination
            current={currentPage}
            total={reviews.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
