import React, { useEffect, useState } from 'react'
import AppSidebar from '../components/Sidebar/AppSidebar'
import VerticalCard from '../components/Card/VerticalCard'
import AppPagination from '../components/AppPagination'
import { message } from 'antd'
import { getBlogComicPagination } from '../services/blogService.js'
import { PAGINATION } from '../constants/api.js'
import React, { useState } from "react";
import { getAllCategoryAPI } from "../services/categoryService";
import { useEffect } from "react";

const comics = [
  {
    image:
      "https://i.pinimg.com/736x/45/38/dd/4538dd15bc7614d37b283ae3018bbf8c.jpg",
    date: "14/02/2025",
    title: "Phàm Nhân Tu Tiên",
    description:
      '"Phàm Nhân Tu Tiên" kể về hành trình nghịch thiên cải mệnh của Hàn Lập, một người bình thường với linh căn tứ hệ. Từ một tiểu tu sĩ yếu ớt, Hàn Lập đã vượt qua vô số khó khăn, đối mặt với những thử thách khắc nghiệt của tu tiên giới. Câu chuyện không chỉ là hành trình tu luyện mà còn là bài học về sự kiên trì, mưu trí và tình bạn chân thành.',
    tags: ["Review Truyện", "Phân Tích", "Nhân Vật"],
    types: ["Action", "Adventure", "Fantasy"],
    rate: 4.8,
    rateCount: 1250,
    commentCount: 328,
    saveCount: 567,
    viewCount: 12345,
  },
  {
    image:
      "https://i.pinimg.com/736x/6e/f9/37/6ef9377b83805bc1b0342eea8503f359.jpg",
    date: "03/08/2024",
    title: "Tiên Nghịch",
    description:
      '"Tiên Nghịch" xoay quanh Vương Lâm và con đường tu tiên đầy bi thương. Sinh ra trong một gia tộc bị truy sát, Vương Lâm phải đối mặt với số phận nghiệt ngã từ nhỏ. Với tài năng thiên phú và ý chí sắt đá, anh đã vượt qua mọi khó khăn để trở thành một cường giả. Câu chuyện không chỉ là hành trình tu luyện mà còn là cuộc đấu tranh giữa thiện và ác, giữa tình yêu và thù hận.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Drama", "Fantasy"],
    rate: 4.5,
    rateCount: 980,
    commentCount: 245,
    saveCount: 432,
    viewCount: 9876,
  },
  {
    image:
      "https://i.pinimg.com/736x/44/d3/7f/44d37ff89278eb8996910584a6b89a36.jpg",
    date: "26/10/2024",
    title: "Ngã Dục Phong Thiên",
    description:
      '"Ngã Dục Phong Thiên" là câu chuyện về Lâm Phàm và con đường nghịch thiên đầy chông gai. Sinh ra trong một thế giới nơi sức mạnh là tất cả, Lâm Phàm đã chọn con đường tu luyện khác biệt. Với tài năng đặc biệt và sự thông minh vượt trội, anh đã tạo nên những kỳ tích không tưởng. Câu chuyện không chỉ là hành trình tu luyện mà còn là cuộc phiêu lưu đầy thú vị và bất ngờ.',
    tags: ["Review Truyện", "Nhân Vật", "Phân Tích"],
    types: ["Action", "Fantasy", "Adventure"],
    rate: 4.7,
    rateCount: 1100,
    commentCount: 289,
    saveCount: 498,
    viewCount: 11234,
  },
  {
    image:
      "https://meviethoa.com/wp-content/uploads/2024/12/1119bf023b554d8f450bbad13c97a9cb2970-1024x576.jpg",
    date: "07/01/2025",
    title: "Tru Tiên",
    description:
      '"Tru Tiên" là hành trình tu tiên và đấu tranh nội tâm của Trương Tiểu Phàm. Sinh ra trong một gia tộc tu tiên, nhưng lại mang trong mình một bí mật lớn, Trương Tiểu Phàm phải đối mặt với vô số thử thách. Từ một thiếu niên ngây thơ, anh đã trưởng thành qua những biến cố, học cách đối mặt với số phận và tìm ra con đường của riêng mình. Câu chuyện không chỉ là hành trình tu luyện mà còn là bài học về tình yêu, tình bạn và lòng trung thành.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Romance", "Fantasy"],
    rate: 4.9,
    rateCount: 1500,
    commentCount: 412,
    saveCount: 678,
    viewCount: 15678,
  },
  {
    image:
      "https://i.pinimg.com/736x/6c/f8/24/6cf824f54c543c6adc29dfe60f937865.jpg",
    date: "11/03/2024",
    title: "Đấu Phá Thương Khung",
    description:
      '"Đấu Phá Thương Khung" kể về Tiêu Viêm cùng hành trình phục thù và cường hóa. Từ một thiên tài tu luyện bị mất đi tài năng, Tiêu Viêm đã không ngừng nỗ lực để khôi phục sức mạnh. Với sự giúp đỡ của Dược Lão và những người bạn chân thành, anh đã vượt qua mọi khó khăn để đạt được mục tiêu. Câu chuyện không chỉ là hành trình tu luyện mà còn là bài học về sự kiên trì và tình bạn chân thành.',
    tags: ["Review Truyện", "Nhân Vật"],
    types: ["Action", "Adventure", "Fantasy"],
    rate: 4.6,
    rateCount: 1350,
    commentCount: 356,
    saveCount: 589,
    viewCount: 13456,
  },
  {
    image:
      "https://i.pinimg.com/736x/e4/cb/ec/e4cbeccefdc1982264ba93e91f8bf2e9.jpg",
    date: "17/06/2025",
    title: "Bách Luyện Thành Thần",
    description:
      '"Bách Luyện Thành Thần" nói về La Chinh vượt qua khó khăn để tu luyện đỉnh cao. Sinh ra trong một gia tộc bị truy sát, La Chinh phải đối mặt với số phận nghiệt ngã từ nhỏ. Với tài năng đặc biệt và ý chí sắt đá, anh đã vượt qua mọi khó khăn để trở thành một cường giả. Câu chuyện không chỉ là hành trình tu luyện mà còn là cuộc đấu tranh giữa thiện và ác, giữa tình yêu và thù hận.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
    rate: 4.4,
    rateCount: 890,
    commentCount: 234,
    saveCount: 345,
    viewCount: 8765,
  },
  {
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60",
    date: "22/11/2024",
    title: "Tuyệt Thế Đường Môn",
    description:
      '"Tuyệt Thế Đường Môn" là phần tiếp theo trong thế giới Đấu La, đầy hấp dẫn. Câu chuyện xoay quanh Đường Tam và những người bạn của anh trong hành trình tu luyện. Với tài năng đặc biệt và sự thông minh vượt trội, họ đã tạo nên những kỳ tích không tưởng. Câu chuyện không chỉ là hành trình tu luyện mà còn là bài học về tình bạn, tình yêu và lòng trung thành.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
    rate: 4.7,
    rateCount: 1200,
    commentCount: 312,
    saveCount: 456,
    viewCount: 10987,
  },
  {
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60",
    date: "01/05/2024",
    title: "Hệ Thống Tu Luyện Toàn Năng",
    description:
      '"Hệ Thống Tu Luyện Toàn Năng" theo chân nhân vật chính trong hành trình tu luyện đầy thú vị. Với hệ thống đặc biệt giúp tăng tốc độ tu luyện, nhân vật chính đã vượt qua mọi khó khăn để trở thành một cường giả. Câu chuyện không chỉ là hành trình tu luyện mà còn là cuộc phiêu lưu đầy thú vị và bất ngờ, với những tình tiết hấp dẫn và những nhân vật đặc sắc.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
    rate: 4.3,
    rateCount: 780,
    commentCount: 198,
    saveCount: 321,
    viewCount: 7654,
  },
  {
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60",
    date: "19/09/2024",
    title: "Đế Bá",
    description:
      '"Đế Bá" kể về Lý Thất Dạ - người sống hàng vạn năm và nắm giữ bí mật kinh thiên. Với trí tuệ và kinh nghiệm tích lũy qua nhiều đời, Lý Thất Dạ đã tạo nên những kỳ tích không tưởng. Câu chuyện không chỉ là hành trình tu luyện mà còn là cuộc đấu tranh giữa các thế lực, giữa thiện và ác. Với những tình tiết hấp dẫn và những nhân vật đặc sắc, "Đế Bá" đã trở thành một trong những tác phẩm tu tiên nổi tiếng nhất.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Drama", "Fantasy"],
    rate: 4.8,
    rateCount: 1400,
    commentCount: 378,
    saveCount: 543,
    viewCount: 14567,
  },
  {
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60",
    date: "06/12/2025",
    title: "Vũ Động Càn Khôn",
    description:
      '"Vũ Động Càn Khôn" xoay quanh hành trình nghịch chuyển vận mệnh của Lâm Động. Sinh ra trong một gia tộc bị truy sát, Lâm Động phải đối mặt với số phận nghiệt ngã từ nhỏ. Với tài năng đặc biệt và ý chí sắt đá, anh đã vượt qua mọi khó khăn để trở thành một cường giả. Câu chuyện không chỉ là hành trình tu luyện mà còn là cuộc đấu tranh giữa thiện và ác, giữa tình yêu và thù hận. Với những tình tiết hấp dẫn và những nhân vật đặc sắc, "Vũ Động Càn Khôn" đã trở thành một trong những tác phẩm tu tiên nổi tiếng nhất.',
    tags: ["Review Truyện", "Phân Tích"],
    types: ["Action", "Adventure", "Fantasy"],
    rate: 4.6,
    rateCount: 1150,
    commentCount: 298,
    saveCount: 432,
    viewCount: 9876,
  },
];

let ReviewPageMenu = [
  {
    label: "Thể loại truyện",
    children: [],
  },
  { label: 'Tất cả truyện', to: '/all-comics' },
]

const PAGE_SIZE = 6

const ReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([])
  const [meta, setMeta] = useState(null)
  useEffect(() => {
    getBlogs()
  }, [currentPage])
  const getBlogs = async () => {
    try {
      const res = await getBlogComicPagination(currentPage - 1, PAGINATION.SIZE)
      setBlogs(res.result)
      setMeta(res.meta)
    } catch (err) {
      message.error(err.data)
    }
  }
  const filteredComics = selectedGenre
    ? comics.filter((comic) => comic.types.includes(selectedGenre))
    : comics

  // Tính toán index của truyện hiển thị trên trang hiện tại
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pagedComics = filteredComics.slice(startIdx, endIdx);

  // Reset về trang đầu mỗi khi chọn thể loại mới
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre)
    setCurrentPage(1)
  }

  const getCategories = async () => {
    try {
      const response = await getAllCategoryAPI();
      setCategories(response);
      ReviewPageMenu.children = response;
    } catch (error) {
      message.error("Lỗi khi lấy danh mục truyện");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex h-full mb-15">
      <div className="ReviewPage-sidebar">
        <AppSidebar
          // Truyền menu và hàm xử lý sự kiện chọn thể loại
          menuItems={ReviewPageMenu}
          // Truyền hàm xử lý sự kiện chọn thể loại
          onGenreSelect={handleGenreSelect}
        />
      </div>
      <div className="ReviewPage-content flex flex-col flex-1 pt-10 px-3">
        <div className="flex flex-wrap gap-5 justify-center">
          {blogs.length > 0 ? (
            blogs.map((comic) => (
              <VerticalCard key={comic.id} {...comic} />
            ))
          ) : (
            <p>Không có truyện nào cho thể loại này.</p>
          )}
        </div>
        <div className="flex justify-center mt-5 mb-13 pb-5">
          {
            meta !== null &&
            <AppPagination
              current={currentPage}
              total={meta.total}
              pageSize={meta.pageSize}
              onChange={setCurrentPage}
            />
          }

        </div>
      </div>
    </div>
  )
}

export default ReviewPage
