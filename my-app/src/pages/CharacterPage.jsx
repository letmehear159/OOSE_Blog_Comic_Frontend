import React, { useEffect, useState } from 'react'
import AppPagination from '../components/AppPagination'
import VerticalCard from '../components/Card/VerticalCard'
import { getBlogCharacterPaginationAPI, getBlogComicPaginationAPI } from '../services/blogService.js'
import { PAGINATION } from '../constants/api.js'
import { message } from 'antd'



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
