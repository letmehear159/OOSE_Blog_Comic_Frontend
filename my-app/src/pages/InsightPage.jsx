import React, { useEffect, useState } from 'react'
import AppSidebar from '../components/Sidebar/AppSidebar'
import VerticalCard from '../components/Card/VerticalCard'
import AppPagination from '../components/AppPagination'
import { message } from 'antd'
import { getBlogComicPaginationAPI, getBlogInsightPaginationAPI } from '../services/blogService.js'
import { PAGINATION } from '../constants/api.js'

const comics = [
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '14/02/2025',
    title: 'Phàm Nhân Tu Tiên',
    description:
      '"Phàm Nhân Tu Tiên" kể về hành trình nghịch thiên cải mệnh của Hàn Lập.',
    tags: ['Review Truyện', 'Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '03/08/2024',
    title: 'Tiên Nghịch',
    description:
      '"Tiên Nghịch" xoay quanh Vương Lâm và con đường tu tiên đầy bi thương.',
    tags: ['Review Truyện', 'Phân Tích'],
    types: ['Action', 'Drama', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '26/10/2024',
    title: 'Ngã Dục Phong Thiên',
    description:
      '"Ngã Dục Phong Thiên" là câu chuyện về Lâm Phàm và con đường nghịch thiên.',
    tags: ['Review Truyện', 'Nhân Vật', 'Phân Tích'],
    types: ['Action', 'Fantasy', 'Adventure'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '07/01/2025',
    title: 'Tru Tiên',
    description:
      '"Tru Tiên" là hành trình tu tiên và đấu tranh nội tâm của Trương Tiểu Phàm.',
    tags: ['Review Truyện', 'Phân Tích'],
    types: ['Action', 'Romance', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '11/03/2024',
    title: 'Đấu Phá Thương Khung',
    description:
      '"Đấu Phá Thương Khung" kể về Tiêu Viêm cùng hành trình phục thù và cường hóa.',
    tags: ['Review Truyện', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '17/06/2025',
    title: 'Bách Luyện Thành Thần',
    description:
      '"Bách Luyện Thành Thần" nói về La Chinh vượt qua khó khăn để tu luyện đỉnh cao.',
    tags: ['Review Truyện', 'Phân Tích'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '22/11/2024',
    title: 'Tuyệt Thế Đường Môn',
    description:
      '"Tuyệt Thế Đường Môn" là phần tiếp theo trong thế giới Đấu La, đầy hấp dẫn.',
    tags: ['Review Truyện', 'Phân Tích'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '01/05/2024',
    title: 'Hệ Thống Tu Luyện Toàn Năng',
    description: '"Hệ Thống Tu Luyện Toàn Năng" theo chân nhân vật chính ',
    tags: ['Review Truyện', 'Phân Tích'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '19/09/2024',
    title: 'Đế Bá',
    description:
      '"Đế Bá" kể về Lý Thất Dạ - người sống hàng vạn năm và nắm giữ bí mật kinh thiên.',
    tags: ['Review Truyện', 'Phân Tích'],
    types: ['Action', 'Drama', 'Fantasy'],
  },
  {
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    date: '06/12/2025',
    title: 'Vũ Động Càn Khôn',
    description:
      '"Vũ Động Càn Khôn" xoay quanh hành trình nghịch chuyển vận mệnh của Lâm Động.',
    tags: ['Review Truyện', 'Phân Tích'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
]

const ReviewPageMenu = [
  {
    label: 'Thể loại truyện',
    children: [
      { label: 'Action', to: '/genre/action' },
      { label: 'Adventure', to: '/genre/adventure' },
      { label: 'Drama', to: '/genre/drama' },
      { label: 'Fantasy', to: '/genre/fantasy' },
      { label: 'Romance', to: '/genre/romance' },
    ],
  },
  { label: 'Tất cả truyện', to: '/all-comics' },
]
const InsightPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [meta, setMeta] = useState(null)
  useEffect(() => {
    getBlogs()
  }, [currentPage])
  const getBlogs = async () => {
    try {
      const res = await getBlogInsightPaginationAPI(currentPage - 1, PAGINATION.SIZE)
      setBlogs(res.result)
      setMeta(res.meta)
    } catch (err) {
      message.error(err.data)
    }
  }
  const filteredComics = selectedGenre
    ? comics.filter((comic) => comic.types.includes(selectedGenre))
    : comics

  // Reset về trang đầu mỗi khi chọn thể loại mới
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre)
    setCurrentPage(1)
  }

  return (
    <div className="flex h-full ">
      <div>
        <AppSidebar
          // Truyền menu và hàm xử lý sự kiện chọn thể loại
          menuItems={ReviewPageMenu}
          // Truyền hàm xử lý sự kiện chọn thể loại
          // onGenreSelect={handleGenreSelect}
        />
      </div>
      <div className="flex flex-col flex-1 pt-10 px-3 ">
        <div className="flex flex-wrap gap-5 h-[930px] justify-start overflow-y-scroll">
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

export default InsightPage
