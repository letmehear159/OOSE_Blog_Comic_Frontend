import React, { useState } from "react";
import AppSidebar from "../components/Sidebar/AppSidebar";
import VerticalCard from "../components/Card/VerticalCard";
import AppPagination from "../components/AppPagination";
import { getAllCategoryAPI } from "../services/categoryService";
import { useEffect } from "react";
import { message } from "antd";
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
      "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/474002400_122196460082187414_2347635067313044271_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEkS-LWQphN5eou7FZ_FH4sN0UXJWALGiQ3RRclYAsaJDF2QXc0c-jbglvAr8tZ26nnDVGiu39C8VHYOu_xrEkT&_nc_ohc=qhkwvNdlEI8Q7kNvwGGDEK7&_nc_oc=Adkv_gXtu7MGObbsCc-IRF2yWPRG1_CRXQinvurWrBo1gz0WLx7lEzYeMl70WfELvV4&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=DBxo_BKayuNOoFR8ogwWIQ&oh=00_AfJxH-7ECvWuay2oh71p9Lu8Z0vVwJWpZXZ2nwCpaZpKow&oe=6827F745",
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
      "https://i.pinimg.com/736x/0e/3b/b8/0e3bb82d00926c367a46cdc6455f0c96.jpg",
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
      "https://i.pinimg.com/736x/b8/b1/96/b8b196322a5d6ae8dd80cd2a1903da30.jpg",
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
      "https://i.pinimg.com/736x/d5/f4/c3/d5f4c30c091fd56dace2c3dea400b847.jpg",
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
      "https://sttruyen.com/storage/thumb/he-thong-tu-luyen-toan-nang_9ad25f565616282ae29410b1ebe7b713.jpg",
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
    image: "https://static.cdnno.com/poster/de-ba/300.jpg?1585205580",
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
      "https://i.pinimg.com/736x/5f/3e/76/5f3e76cff75850becf257360fca5f547.jpg",
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
  {
    image:
      "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/486778457_1242936130761279_951263527574567455_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFxWkzyb4_rJ2S5Uz29kSFtU3cLsss59QFTdwuyyzn1AdbnnZIMkenJzggec5hkqElEaqjBKI2HRbE4S6GMKMAO&_nc_ohc=MIV5N73YTNcQ7kNvwFDmZDC&_nc_oc=AdkZzpWOCU-2dzfxGKPDd0X8nR0UdoXMaCqSopA3bE08CqTDbfpTHVJy6uiAO7w08TY&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=Qd8grqkMBhnvMQPDadI2Mg&oh=00_AfIiHqVgLwmhZVKRkxV1h1JpZsOuwNzgL9shKW4XZlRCLg&oe=68282419",
    date: "01/12/2020",
    title: "Thôn Phệ Tinh Không",
    description:
      '"Thôn Phệ Tinh Không" theo chân La Phong trong một thế giới hậu tận thế, nơi anh bắt đầu con đường tu luyện để bảo vệ người thân và khám phá những bí mật của vũ trụ. Với kỹ xảo 3D hiện đại và nội dung hấp dẫn, bộ phim là một trong những donghua được đánh giá cao trong dòng tu luyện vũ trụ.',
    tags: ["Review Truyện", "Phân Tích", "Chuyển Thể"],
    types: ["Action", "Sci-Fi", "Martial Arts"],
    rate: 4.6,
    rateCount: 980,
    commentCount: 243,
    saveCount: 410,
    viewCount: 10432,
  },
  {
    image:
      "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/482359921_1187975726318464_4404087652397620697_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeH_VBp0b_M9vGR6oyayShBo-gAgHYJqimX6ACAdgmqKZUxYFXo0_56nETPXgXWf6Bk2PUY-4HX3TPyRIt1bCRMh&_nc_ohc=Dtwhb6syFKIQ7kNvwGx3VYE&_nc_oc=Adk6zA5IPj0JxUs91xkF7buu_egHQxRRGpfZWlVu64qDVpJWyP9Q6_d2O-Uosr3shKM&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=HfnKiRPe6KKdFAGUwfupmQ&oh=00_AfLR7f4fqslXIUPZbrA_LYOlQWKFYMC2ktzS7MIYqtwVuA&oe=6827F8DC",
    date: "2020-07-10",
    title: "Mục Thần Ký",
    description:
      '"Mục Thần Ký" kể về Tần Mục, một cậu bé lớn lên trong một ngôi làng kỳ lạ, mang theo định mệnh đặc biệt. Khi bước vào thế giới rộng lớn hơn, Tần Mục bắt đầu hành trình khám phá thân thế và vượt qua những thế lực mạnh mẽ. Bản hoạt hình chuyển thể mang đến đồ họa đặc sắc và các tình tiết gay cấn.',
    tags: ["Review Truyện", "Chuyển Thể"],
    types: ["Action", "Fantasy", "Adventure"],
    rate: 4.5,
    rateCount: 860,
    commentCount: 210,
    saveCount: 385,
    viewCount: 9823,
  },
  {
    image:
      "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/87267990_2999168790134715_7360703806444666880_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeHoNVxYWXx-AEIm3EJ4uZiSwUrA0zoXF73BSsDTOhcXvW0RvEf-iflbidnjTZljIXyKx8vHedXgWXDOvOwj2PVg&_nc_ohc=zueFQV8U318Q7kNvwGBK0lj&_nc_oc=AdnI6UglfQaDlaC7BbKsOki_qTX_ccS81NCwDHVWmuGJHRlJB-NICyPOUOJc-x7aLPw&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=qDVMT9K5GmZOmvhJDK-J7g&oh=00_AfI1-CqjofW0PASZ6ttYhzcI36tPk1p_DObPu6k25t-7qg&oe=6849BA72",
    date: "2022-09-05",
    title: "Võ Thần Chúa Tể",
    description:
      '"Võ Thần Chúa Tể" kể về Tần Trần – người từng là chí tôn của thế giới võ đạo, bị hãm hại rồi sống lại. Từ đó, anh bước vào hành trình phục thù và trở lại đỉnh cao. Bản hoạt hình được đánh giá cao với chất lượng hình ảnh tốt và cốt truyện chặt chẽ.',
    tags: ["Review Truyện", "Phân Tích", "Chuyển Thể"],
    types: ["Action", "Fantasy", "Adventure"],
    rate: 4.6,
    rateCount: 980,
    commentCount: 221,
    saveCount: 412,
    viewCount: 10345,
  },
  {
    image:
      "https://i.pinimg.com/1200x/6a/c2/83/6ac283cf7b3f4f764235c2ee3cf566d6.jpg",
    date: "2021-07-23",
    title: "Thế Giới Hoàn Mỹ",
    description:
      '"Thế Giới Hoàn Mỹ" kể về Thạch Hạo – một thiên tài sinh ra trong bộ tộc cổ xưa, với vận mệnh phi thường. Anh trải qua vô số thử thách để khám phá thế giới rộng lớn và chân lý của tu luyện. Hoạt hình có đồ họa hoành tráng, được khán giả yêu thích bởi bám sát nguyên tác.',
    tags: ["Review Truyện", "Phân Tích", "Chuyển Thể"],
    types: ["Action", "Fantasy", "Adventure"],
    rate: 4.7,
    rateCount: 1100,
    commentCount: 288,
    saveCount: 450,
    viewCount: 11289,
  },
];

let ReviewPageMenu = [
  {
    label: "Thể loại truyện",
    children: [],
  },
  { label: "Tất cả truyện", to: "/all-comics" },
];

const PAGE_SIZE = 6;

const ReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [categories, setCategories] = useState([]);

  // Lọc truyện theo thể loại đã chọn
  const filteredComics = selectedGenre
    ? comics.filter((comic) => comic.types.includes(selectedGenre))
    : comics;

  // Tính toán index của truyện hiển thị trên trang hiện tại
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pagedComics = filteredComics.slice(startIdx, endIdx);

  // Reset về trang đầu mỗi khi chọn thể loại mới
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

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
    <div className="flex h-full ">
      <div>
        <AppSidebar
          // Truyền menu và hàm xử lý sự kiện chọn thể loại
          menuItems={ReviewPageMenu}
          // Truyền hàm xử lý sự kiện chọn thể loại
          onGenreSelect={handleGenreSelect}
        />
      </div>
      <div className="flex flex-col flex-1 pt-10 px-3">
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
