import { Image, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { getAllBlogComicsAPI } from '../../services/blogService.js'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'

export const SearchBlogComic = ({ setBlogComic }) => {
  const [blogs, setBlogs] = useState(null)
  const [search, setSearch] = useState('')
  useEffect(() => {
    getAllBlogComics()
  }, [])
  const getAllBlogComics = async () => {
    try {
      const res = await getAllBlogComicsAPI()
      setBlogs(res.result)
    } catch (error) {
      message.error('Gặp lỗi khi lấy danh sách truyện')

    }
  }

  const filteredBlogs = blogs === null ? null : blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleChooseBlog = (blogComic) => {
    setBlogComic(blogComic)
  }

  return (
    <>
      <div className="text-left text-lg font-medium mb-2">Nhân vật này thuộc truyện:</div>

      <div className="flex mb-4">
        <Input.Search
          placeholder="Tìm blog theo tiêu đề"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 400 }}
          className="!rounded-md !border-gray-300 shadow-sm transition-all duration-300 focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-400"
        />
      </div>

      <div
        className="border border-gray-200 rounded-md shadow-inner p-4 text-left w-[400px] overflow-y-auto h-[200px] mb-10 bg-white">
        {filteredBlogs===null ? (
          <div className="text-gray-500 italic">Không tìm thấy kết quả phù hợp.</div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="hover:bg-amber-100 p-2 h[80px] rounded-md cursor-pointer flex items-start transition-colors duration-200 gap-4"
              onClick={() => handleChooseBlog(blog)}
            >
              <div className="w-[80px] h-[60px] flex-shrink-0 overflow-hidden rounded ">
                <Image
                  src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                  className="w-full h-full !object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-gray-800">{blog.title}</h3>

            </div>
          ))
        )}
      </div>

    </>
  )

}