import {
  Card,
  Col,
  Row,
  Typography,
  Avatar,
  Button,
  Divider,
  Checkbox,
} from "antd";
import { HeartFilled } from "@ant-design/icons";

// Trên thanh Navbar (components/navigation/Navbar.jsx) sẽ có 1 thanh search và 1 button "Tìm kiếm nâng cao"
// User sẽ chọn cách search ở thanh Navbar (đối với search by title thì nhập trực tiếp vô thanh seach bar)
// Dù chọn cách nào cũng sẽ redirect qua trang "SearchResultPage"

// Thêm logic search by keyword + logic hiện gợi ý search (UI của gợi ý search components/SearchSuggestion.jsx)
// Thêm logic query database để hiển thị các category/tag + search by category/tag
// Thêm logic query những blogger có liên quan đến các blog được tìm thấy 
// Thêm logic save favourite blog ở button ♥ của mỗi card blog + logic redirect qua trang cá nhân của blogger

const { Title, Text } = Typography;

const SearchResultPage = () => {
  // -----Hardcode data-----
  const blogResults = [
    {
      id: 1,
      title: "Top 10 bộ manga hot nhất năm 2025",
      date: "30/04/2025",
      blogger: "Chuột Lê",
      avatar: "https://i.pravatar.cc/150?img=3",
      thumbnail: "https://placehold.co/600x300?text=Manga+Hot",
    },
    {
      id: 2,
      title: "Review bộ truyện “Attack on Titan”",
      date: "01/05/2025",
      blogger: "Chuột Lê",
      avatar: "https://i.pravatar.cc/150?img=3",
      thumbnail: "https://placehold.co/600x300?text=AoT",
    },
    {
      id: 3,
      title: "Review bộ truyện “Chainsaw Man”",
      date: "01/05/2025",
      blogger: "Lê Chuột",
      avatar: "https://i.pravatar.cc/150?img=4",
      thumbnail: "https://placehold.co/600x300?text=Chainsaw+Man",
    },
    {
      id: 4,
      title: "Review bộ truyện “Killing Bite”",
      date: "03/05/2025",
      blogger: "Lê Chuột",
      avatar: "https://i.pravatar.cc/150?img=4",
      thumbnail: "https://placehold.co/600x300?text=Killing+Bite",
    },
  ];

  const bloggerResults = [
    {
      id: 1,
      name: "Chuột Lê",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 2,
      name: "Lê Chuột",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ];

  const categories = [
    "Hành động",
    "Tình cảm",
    "Phiêu lưu",
    "Hài hước",
    "Kinh dị",
    "Học đường",
    "Siêu nhiên",
    "Thể thao",
    "Lịch sử",
    "Kỳ ảo",
    "Drama",
    "Trinh thám",
    "Âm nhạc",
    "Võ thuật",
    "Viễn tưởng",
    "18+",
    "Đời thường",
    "Xuyên không",
    "Game",
    "Mecha",
    "Ecchi",
    "Josei",
    "Shoujo",
    "Shounen",
    "Seinen",
    "Chuyển sinh",
    "Zombie",
    "Ẩm thực",
    "Gia đình",
  ];
  // -----Hardcode data-----

  return (
    <div className="bg-[#000000] min-h-screen text-white px-4 py-6 sm:ml-32">
      <div className="text-center mb-6">
        <Title level={4} style={{ color: "white" }}>
          Tìm kiếm theo tên
        </Title>
        <div className="w-full max-w-xl mx-auto mt-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full rounded-md bg-gray-800 border border-gray-600 !text-white px-3 py-1.5 placeholder-gray-400 focus:outline-none"
            // TODO: Thêm logic search
          />
        </div>

        <div className="w-24 h-[2px] bg-white my-4 mx-auto rounded-full" />

        <Title level={4} style={{ color: "white" }}>
          Tìm kiếm bộ lọc
        </Title>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categories.map((cat, idx) => (
            <Checkbox key={idx} className="!text-white">
              {cat}
            </Checkbox>
          ))}
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={() => {
              // TODO: xử lý tìm kiếm với bộ lọc
            }}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <Divider className="bg-yellow-600 h-0.5 my-8" />

      <Title level={4} style={{ color: "white" }} className="mb-3">
        Bài viết liên quan
      </Title>
      <Row gutter={[16, 16]}>
        {blogResults.map((blog) => (
          <Col xs={24} sm={12} md={8} key={blog.id}>
            <Card
              hoverable
              onClick={() => {
                // TODO: chuyển hướng đến blog cụ thể
              }}
              style={{ backgroundColor: "#2a1a2f", border: "none" }}
              className="cursor-pointer p-0"
              bodyStyle={{ padding: "12px" }}
              cover={
                <div className="relative">
                  <img
                    alt="thumbnail"
                    src={blog.thumbnail}
                    className="rounded-t-md h-48 w-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 rounded-full bg-white/10 hover:bg-white/20 p-1 transition-transform duration-200 hover:scale-110 animate-pulse hover:animate-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: xử lý yêu thích
                    }}
                  >
                    <HeartFilled style={{ color: "red", fontSize: 16 }} />
                  </button>
                </div>
              }
            >
              <Title level={5} style={{ color: "white", marginBottom: 8 }}>
                {blog.title}
              </Title>
              <div className="flex items-center gap-3">
                <Avatar size={32} src={blog.avatar} />
                <Text style={{ color: "white" }}>{blog.blogger}</Text>
                <Text style={{ color: "gray", marginLeft: "auto" }}>
                  {blog.date}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider className="bg-yellow-600 h-0.5 my-10" />

      <Title level={4} style={{ color: "white" }} className="mb-3">
        Blogger liên quan
      </Title>
      <Row gutter={[16, 16]}>
        {bloggerResults.map((blogger) => (
          <Col xs={24} sm={12} md={6} key={blogger.id}>
            <Card
              hoverable
              onClick={() => {
                // TODO: chuyển hướng đến trang cá nhân blogger
              }}
              style={{ backgroundColor: "#2a1a2f", border: "none" }}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Avatar size={48} src={blogger.avatar} />
                <Text style={{ color: "white", fontSize: 16 }}>
                  {blogger.name}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchResultPage;
