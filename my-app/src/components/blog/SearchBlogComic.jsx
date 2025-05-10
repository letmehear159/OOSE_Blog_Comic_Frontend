import { Image, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { getAllBlogComicsAPI } from '../../services/blogService.js'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { SearchOutlined } from '@ant-design/icons'

export const SearchBlogComic = ({ blogComic, setBlogComic }) => {
  const [blogs, setBlogs] = useState(null)
  const [search, setSearch] = useState('')
  useEffect(() => {
    getAllBlogComics()
  }, [])

  useEffect(() => {

  }, [blogComic])

  const getAllBlogComics = async () => {
    try {
      const res = await getAllBlogComicsAPI()
      setBlogs(res)
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
      <div className="max-w-2xl mx-auto">
        {/* Tiêu đề */}
        <div
          className="text-left text-xl mb-4 font-semibold text-gray-800 underline decoration-blue-500 decoration-2 underline-offset-4">
          Bài viết này thuộc truyện:
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Input
            placeholder="Tìm blog theo tiêu đề"
            prefix={<SearchOutlined className="text-gray-400"/>}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border-gray-300 shadow-md hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
            style={{ height: 48, fontSize: 16, padding: '0 16px', width: '100%', maxWidth: 400 }}
          />
        </div>

        {/* Blog List */}
        <div
          className="border border-gray-200 rounded-xl shadow-sm p-4 text-left w-full max-w-[400px] h-[240px] overflow-y-auto bg-white mb-8 transition-all duration-300 hover:shadow-md">
          {filteredBlogs === null || filteredBlogs.length === 0 ? (
            <div className="text-gray-500 italic text-center py-6">Không tìm thấy kết quả phù hợp.</div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-200
                 ${blogComic !== null && blog.id === (blogComic.id) ? 'bg-blue-100' : 'bg-white'}`}
                onClick={() => handleChooseBlog(blog)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleChooseBlog(blog)}
              >
                {/* Thumbnail */}
                <div className="w-[64px] h-[48px] flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                    alt={blog.title}
                    width={64}
                    height={48}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Title */}
                <div className=" text-gray-800 line-clamp-2 leading-5 font-bold">
                  {blog.title}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </>
  )

}