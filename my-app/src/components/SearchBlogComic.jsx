import { Image, Input, message } from 'antd'
import { URL_BACKEND_IMAGES } from '../api/userApi.js'
import { useEffect, useState } from 'react'
import { getAllBlogComicsAPI } from '../services/blogService.js'

const blogFake = [
  {
    'id': 11,
    'title': 'Tiên Nghịch - Hành trình của Vương Lâm',
    'summary': 'Khám phá hành trình tu tiên của Vương Lâm trong thế giới đầy cạm bẫy.',
    'content': '<p>Vương Lâm là một người phàm bình thường, nhưng có cơ duyên bất ngờ...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-01-01T08:00:00Z'
  },
  {
    'id': 2,
    'title': 'Nhất Niệm Vĩnh Hằng - Bí ẩn của Thất Thái',
    'summary': 'Bạch Tiểu Thuần và hành trình phá vỡ giới hạn sinh tử.',
    'content': '<p>Với tính cách hài hước, Bạch Tiểu Thuần đã làm thay đổi cả giới tu tiên...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-02-10T10:30:00Z'
  },
  {
    'id': 3,
    'title': 'Ma Thiên Ký - Ma Đạo và Chính Đạo',
    'summary': 'Tiêu Thần và cuộc chiến giữa thiện và ác trong giới tu đạo.',
    'content': '<p>Không cam chịu số phận, Tiêu Thần đã bước vào ma đạo để tìm lại công lý...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-03-15T14:20:00Z'
  },
  {
    'id': 4,
    'title': 'Phàm Nhân Tu Tiên - Sự thật sau thế giới tu luyện',
    'summary': 'Hàn Lập và con đường tu tiên không có thiên phú.',
    'content': '<p>Không có thiên phú nhưng có nghị lực phi thường, Hàn Lập từng bước vươn lên...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-04-05T12:00:00Z'
  }
]

export const SearchBlogComic = ({  setBlogComic }) => {
  const [blogs, setBlogs] = useState(blogFake)
  const [search, setSearch] = useState('')
  useEffect(() => {
    getAllBlogComics()
  }, [])
  const getAllBlogComics = async () => {
    try {
      const res = await getAllBlogComicsAPI()
      setBlogs(res)
    } catch (error) {
      message.error('Gặp lỗi khi lấy danh sách truyện')

    }
  }

  const filteredBlogs = blogs.filter(blog =>
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
        {filteredBlogs.length === 0 ? (
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