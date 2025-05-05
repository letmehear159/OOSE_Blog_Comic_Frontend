import AppSidebar from "../components/Sidebar/AppSidebar";
import CardComic from "../components/Card/VerticalCard";

const comics = [
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện"
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Nhân Vật"
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện"
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện"
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện"
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện"
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện"
  },
  {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    date: "29/04/2025",
    title: "Review truyện Nhất Niệm Vĩnh Hằng",
    description: '"Nhất Niệm Vĩnh Hằng" kể về hành trình tu luyện của Bạch Tiểu Thuần, một...',
    tag: "Review Truyện"
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

const ReviewPage = () => (
  <div className="flex">
    <div className="ReviewPage-sidebar">
        <AppSidebar menuItems={ReviewPageMenu} />
    </div>
    <div className="ReviewPage-content p-5 pt-10 pb-20 ">  
        <div className="flex flex-wrap gap-8 justify-center">
            {comics.map((comic, idx) => (
                <CardComic key={idx} {...comic} />
            ))}
        </div>  
    </div>
  </div>
);

export default ReviewPage;