import { useEffect, useState } from 'react'
import { getBlogByIdService } from '../services/blogService.js'
import { message } from 'antd'
import { Character } from '../components/Character.jsx'
import { useParams } from 'react-router-dom'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'

export const ViewBlogCharacterPage = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    if (!id) return

    getBlogByIdService(id)
      .then((res) => setBlog(res))
      .catch((err) => {
        console.error('>>> Lỗi khi render blog ', err)
        message.error('Không thể tải blog.')
      })
  }, [id])

  return (
    <>
      <style>
        {customImageAlignStyles}
      </style>
      {!blog ? (
        <div className="text-center p-10 text-gray-500">Đang tải blog...</div>
      ) : (
        <>
          <div className={'font-bold text-3xl text-left mb-12'}>{blog.title}</div>
          <div className="grid grid-cols-12 gap-8">
            <div className={'col-span-7'}>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
            <div className={'col-span-4 '}>
              <Character character={blog.character} thumbnail={blog.thumbnail}/>
            </div>
          </div>
        </>
      )}
    </>
  )
}
