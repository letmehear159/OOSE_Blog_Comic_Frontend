import React, { useEffect, useState } from 'react'
import AppPagination from '../components/AppPagination'
import VerticalCard from '../components/Card/VerticalCard'
import itachiImg from '../assets/images/itachi.webp'
import { getBlogCharacterPaginationAPI, getBlogComicPaginationAPI } from '../services/blogService.js'
import { PAGINATION } from '../constants/api.js'
import { message } from 'antd'

const comics = [
  {
    image: itachiImg,
    date: '15/03/2024',
    title: 'Itachi Uchiha',
    description: '"Naruto Shippuden"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '02/07/2024',
    title: 'Lâm Phàm',
    description: '"Ngã Dục Phong Thiên"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '22/11/2025',
    title: 'Gojou Satoru',
    description: '"Jujutsu Kaisen"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '08/09/2025',
    title: 'Trương Tiểu Phàm',
    description: '"Tru Tiên"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '30/12/2024',
    title: 'Levi Ackerman',
    description: '"Attack on Titan"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '18/06/2024',
    title: 'Vương Lâm',
    description: '"Tiên Nghịch"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '04/01/2025',
    title: 'Killua Zoldyck',
    description: '"Hunter x Hunter"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '10/10/2025',
    title: 'Hàn Lập',
    description: '"Phàm Nhân Tu Tiên"',
    tags: ['Phân Tích', 'Nhân Vật'],
    types: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    image: itachiImg,
    date: '25/08/2024',
    title: 'Gojo Yuujiro',
    description: '"Baki the Grappler"',
  },
  {
    image: itachiImg,
    date: '13/05/2024',
    title: 'Đường Tam',
    description: '"Đấu La Đại Lục"',
  },
]
const PAGE_SIZE = 6

const CharacterPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [meta, setMeta] = useState(null)
  useEffect(() => {
    getBlogs()
  }, [currentPage])
  const getBlogs = async () => {
    try {
      const res = await getBlogCharacterPaginationAPI(currentPage - 1, PAGINATION.SIZE)
      setBlogs(res.result)
      setMeta(res.meta)
    } catch (err) {
      message.error(err.data)
    }
  }
  return (
    <div className="CharacterPage-content flex flex-col flex-1 p-10 m-5">
      <div className="flex flex-wrap gap-8 justify-center">
        {blogs.length > 0 ? (
          blogs.map((comic) => (
            <VerticalCard key={comic.id} {...comic} />
          ))
        ) : (
          <p>Không có truyện nào </p>
        )}
      </div>
      <div className="flex justify-center mt-5 mb-8">
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
  )
}

export default CharacterPage
