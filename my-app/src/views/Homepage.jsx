import HorizontalCard from "../components/Card/HorizontalCard";
import CardTrending from "../components/Card/CardTrending";
const reviews = [
    {
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
      authorName: "Vũ Thị Mỹ Hạnh",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "27/03/2025",
    },
    {
        image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        title: "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
        authorName: "Vũ Thị Mỹ Hạnh",
        authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "27/03/2025",
      },
      {
        image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        title: "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
        authorName: "Vũ Thị Mỹ Hạnh",
        authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "27/03/2025",
      },
      {
          image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
          title: "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
          authorName: "Vũ Thị Mỹ Hạnh",
          authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
          date: "27/03/2025",
        },
        {
            image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
            title: "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
            authorName: "Vũ Thị Mỹ Hạnh",
            authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
            date: "27/03/2025",
          },
          {
              image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
              title: "[Review] MASHLE Magic and Muscles | Giới thiệu, Nhân vật, Thuật ngữ",
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

      
    // ...
  ];

const Homepage = () => {
    return (
        <div class="flex justify-center p-10 gap-30 mx-10 ">
            <div></div>
            <div class="w-4/6 text-black p-6 flex flex-col gap-6 items-center mb-10">
                {reviews.map((item, idx) => (
                 <HorizontalCard key={idx} {...item} />
                ))}
            </div>
            <div class="w-2/6 text-black bg-gray-100 rounded-xl p-6 flex flex-col mt-6 gap-6 items-center mb-15">
                <h1 className="text-2xl font-bold text-red-500">Truyện nổi bật</h1>
                {topReviews.map((item, idx) => (
                    <CardTrending key={idx} {...item} />
                ))}
            </div>
            <div></div>
        </div>
    )
}

export default Homepage;