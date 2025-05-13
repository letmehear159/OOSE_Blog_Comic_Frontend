import { Image, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { SearchOutlined } from '@ant-design/icons'
import { getAllCategoryAPI } from '../../services/categoryService.js'

export const SearchCategory = ({ selectedCategory, setSelectedCategory }) => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getAllCategories()
  }, [])
  const getAllCategories = async () => {
    try {
      const res = await getAllCategoryAPI()
      setCategories(res)
    } catch (error) {
      message.error('Gặp lỗi khi lấy danh sách truyện')
    }
  }

  const filteredcategories = categories === null ? null : categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleClickCategory = (category) => {
    const isExisted = selectedCategory.some(c => c.id === category.id)
    if (isExisted) {
      const newCategories = selectedCategory.filter(c => c.id !== category.id)
      setSelectedCategory(newCategories)
    } else {
      const newCategories = [...selectedCategory, category]
      setSelectedCategory(newCategories)
    }
  }
  return (
    <>
      <div className="max-w-2xl mx-auto">
        {/* Tiêu đề */}
        <div
          className="text-left text-xl mb-4 font-semibold text-gray-800 underline decoration-blue-500 decoration-2 underline-offset-4">
          Chọn thể loại truyện
        </div>

        {/* Search Input */}
        <div className="relative w-[300px] mb-6">
          <Input
            placeholder="Tìm thể loại truyện theo tiêu đề"
            prefix={<SearchOutlined className="text-gray-400"/>}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border-gray-300 shadow-md hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
            style={{ height: 48, fontSize: 16, padding: '0 16px', width: '100%', maxWidth: 400 }}
          />
        </div>
        {/* category List */}
        <div
          className="border border-gray-200 rounded-xl shadow-sm p-4 text-left w-full max-w-[400px] h-[240px] overflow-y-auto bg-white mb-8 transition-all duration-300 hover:shadow-md">
          {filteredcategories === null || filteredcategories.length === 0 ? (
            <div className="text-gray-500 italic text-center py-6">Không tìm thấy kết quả phù hợp.</div>
          ) : (
            filteredcategories.map((category) => (
              <div
                key={category.id}
                className={`group my-1 flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-200 ${
                  (selectedCategory.map(se=>se.id)).includes(category.id) ? 'bg-blue-100' : 'bg-white'
                }`}
                onClick={() => handleClickCategory(category)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClickCategory(category)}
              >
                {/* Name */}
                <div className="font-bold  text-gray-800 line-clamp-2 leading-5">
                  {category.name}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </>
  )

}