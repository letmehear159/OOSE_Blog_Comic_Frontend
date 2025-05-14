import {
  Card,
  Col,
  Row,
  Typography,
  Avatar,
  Divider,
  Checkbox,
  message,
  Input,
  Button,
} from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllCategoryAPI } from "../services/categoryService.js";
import { getAllTagAPI } from "../services/tagService.js";
import Search from "antd/es/input/Search.js";
import {
  searchBlogByKeywordAPI,
  searchBlogWithFilter,
} from "../services/blogService.js";
import { URL_BACKEND_IMAGES } from "../constants/images.js";
import { getUsersByIdsAPI } from "../services/userService.js";

// Trên thanh Navbar (components/navigation/Navbar.jsx) sẽ có 1 thanh search và 1 button "Tìm kiếm nâng cao"
// User sẽ chọn cách search ở thanh Navbar (đối với search by title thì nhập trực tiếp vô thanh seach bar)
// Dù chọn cách nào cũng sẽ redirect qua trang "SearchResultPage"

// Thêm logic search by keyword + logic hiện gợi ý search (UI của gợi ý search components/SearchSuggestion.jsx)
// Thêm logic query database để hiển thị các category/tag + search by category/tag
// Thêm logic query những blogger có liên quan đến các blog được tìm thấy
// Thêm logic save favourite blog ở button ♥ của mỗi card blog + logic redirect qua trang cá nhân của blogger

const { Title, Text } = Typography;

const SearchResultPage = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [blogs, setBlogs] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const { Search } = Input;
  useEffect(() => {
    getCategories();
    getTags();
  }, []);
  const getCategories = async () => {
    try {
      const res = await getAllCategoryAPI();
      setCategories(res);
    } catch (error) {
      message.error("Không thể lấy danh sách thể loại");
    }
  };

  const getTags = async () => {
    try {
      const res = await getAllTagAPI();
      setTags(res);
    } catch (error) {
      message.error("Không thể lấy danh sách thể loại");
    }
  };
  const handleCategoryCheckboxChange = (id) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Bỏ chọn
          : [...prev, id] // Chọn thêm
    );
  };

  const handleTagCheckboxChange = (id) => {
    setSelectedTags(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Bỏ chọn
          : [...prev, id] // Chọn thêm
    );
  };

  const searchByKeyword = async (keyword) => {
    if (keyword.length === 0 && keyword.trim() === "") {
      return;
    }
    try {
      const res = await searchBlogByKeywordAPI(keyword, page, size);
      setBlogs(res.result);
      const bloggerIds = res.result.map((blog) => blog.author.userId);
      getBloggerByIds(bloggerIds);
    } catch (error) {
      message.error("Lỗi khi cố gắng tìm danh sách với keyword");
    }
  };

  const searchWithFilter = async () => {
    if (selectedCategories.length === 0 && selectedTags.length === 0) {
      return;
    } else {
      try {
        const res = await searchBlogWithFilter(
          selectedCategories,
          selectedTags,
          page,
          size
        );
        setBlogs(res.result);
        const bloggerIds = res.result.map((blog) => blog.author.userId);
        getBloggerByIds(bloggerIds);
      } catch (e) {
        message.error("Lỗi khi cố gắng tìm danh sách với filter");
      }
    }
  };

  const getBloggerByIds = async (authorIds) => {
    try {
      const res = await getUsersByIdsAPI(authorIds);
      setBloggers(res);
    } catch (error) {
      message.error("Lỗi khi cố gắng tìm nhưng blogger liên quan");
    }
  };
  // -----Hardcode data-----

  return (
    <div className=" min-h-screen text-white px-4 py-6 sm:ml-32">
      <div className="text-center mb-6">
        <Title level={4} style={{ color: "white" }}>
          Tìm kiếm theo tên
        </Title>
        <div className="w-full max-w-xl mx-auto mt-2">
          <Search
            onSearch={searchByKeyword}
            placeholder="Tìm kiếm..."
            // TODO: logic tìm kiếm
          />
        </div>

        <div className="w-24 h-[2px] bg-white my-4 mx-auto rounded-full" />

        <Title level={4} style={{ color: "white" }}>
          Bộ lọc
        </Title>
        <div className={"text-left text-2xl  font-bold"}>Thể loại</div>
        <div className="flex flex-wrap justify-start gap-3 mt-6">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                selectedCategories.includes(cat.id)
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 "
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryCheckboxChange(cat.id)}
              />
              <span className="text-sm font-medium">{cat.name}</span>
            </label>
          ))}
        </div>

        <Divider className="bg-yellow-600 h-0.5 my-10" />
        <div className={"text-left text-2xl  font-bold"}>Nhãn dán</div>
        <div className="flex flex-wrap justify-start gap-3 mt-6">
          {tags.map((tag) => (
            <label
              key={tag.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                selectedTags.includes(tag.id)
                  ? "bg-pink-600 border-pink-600 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagCheckboxChange(tag.id)}
              />
              <span className="text-sm font-medium"># {tag.name}</span>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <Button
            type={"primary"}
            className={"!hover:cursor-pointer"}
            onClick={searchWithFilter}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>

      <Divider className="bg-yellow-600 h-0.5 my-8" />

      <Title level={4} style={{ color: "white" }} className="mb-3">
        Bài viết liên quan
      </Title>
      {blogs !== null && (
        <Row gutter={[16, 16]}>
          {blogs.map((blog) => (
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
                      src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
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
      )}

      <Divider className="bg-yellow-600 h-0.5 my-10" />

      <Title level={4} style={{ color: "white" }} className="mb-3">
        Blogger liên quan
      </Title>
      {/*{bloggers !== null && (*/}
      {/*  <Row gutter={[16, 16]}>*/}
      {/*    {bloggers.map((blogger) => (*/}
      {/*      <Col xs={24} sm={12} md={6} key={blogger.id}>*/}
      {/*        <Card*/}
      {/*          hoverable*/}
      {/*          onClick={() => {*/}
      {/*            // TODO: chuyển hướng đến trang cá nhân blogger*/}
      {/*          }}*/}
      {/*          style={{ backgroundColor: "#2a1a2f", border: "none" }}*/}
      {/*          className="cursor-pointer"*/}
      {/*        >*/}
      {/*          <div className="flex items-center gap-3">*/}
      {/*            <Avatar size={48} src={blogger.avatar} />*/}
      {/*            <Text style={{ color: "white", fontSize: 16 }}>*/}
      {/*              {blogger.name}*/}
      {/*            </Text>*/}
      {/*          </div>*/}
      {/*        </Card>*/}
      {/*      </Col>*/}
      {/*    ))}*/}
      {/*  </Row>*/}
      {/*)}*/}
    </div>
  );
};

export default SearchResultPage;
