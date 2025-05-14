import { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../editor/RichTextEditor.jsx'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { EditCharacterInfo } from '../components/blog/EditCharacterInfo.jsx'
import { Divider, Input, message } from 'antd'
import { AuthContext } from '../context/auth.context.jsx'
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
  updateBlogCharacterAPI,
} from '../services/blogService.js'

import { SearchBlogComic } from '../components/blog/SearchBlogComic.jsx'
import { useParams } from 'react-router-dom'
import { URL_BACKEND_IMAGES } from '../constants/images.js'
import TextArea from 'antd/es/input/TextArea.js'

export const EditBlogCharacterPage = () => {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  // HTML content của bài viết
  const [result, setResult] = useState(null)
  const [preview, setPreview] = useState('')
  const [isImageSaved, setIsImageSaved] = useState(false)
  const [blogComic, setBlogComic] = useState(null)
  const [blogCharacter, setBlogCharacter] = useState(null)
  const [character, setCharacter] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogCharacterThumbnail, setBlogCharacterThumbnail] = useState(null)
  const [introduction, setIntroduction] = useState('')
  const { uploadCharacterAvatar } = useContext(AuthContext)
  const updateBlog = async () => {
    const blogCharacterReq = {
      title: blogTitle,
      authorId: user.id,
      content: result,
      character: character,
      comicId: blogComic === null ? null : blogComic.id,
      introduction:introduction,
    }
    try {
      const response = await updateBlogCharacterAPI(
        blogCharacterReq,
        blogCharacterThumbnail,
        id
      )
      message.success('Sửa bài viết thành công')
    } catch (error) {
      message.error(error.data)
    }
  }

  useEffect(() => {
    if (!id) return

    const getBlogCharacter = async () => {
      try {
        const res = await getBlogCharacterAPI(id)
        setBlogCharacter(res)
        setCharacter(res.character)
        setBlogTitle(res.title)
        setResult(res.content)
        setBlogCharacterThumbnail(res.thumbnail)
        setIntroduction(res.introduction)
      } catch (error) {
        message.error('Lỗi khi lấy dữ liệu bài viết về nhân vật')
      }
    }

    getBlogCharacter()
  }, [id])

  useEffect(() => {
    if (!blogCharacter?.comicId) return

    const getBlogComic = async () => {
      try {
        const res = await getBlogComicAPI(blogCharacter.comicId)
        setBlogComic(res)
      } catch (error) {
        message.error('Lỗi khi lấy dữ liệu truyện của nhân vật')
      }
    }

    getBlogComic()
  }, [blogCharacter])

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <div className="grid grid-cols-12 gap-6">
        {/* Main content section */}
        <div className="col-span-9 mr-6 p-4 bg-white rounded-lg shadow-sm">
          {/* SearchBlogComic Component */}
          <SearchBlogComic blogComic={blogComic} setBlogComic={setBlogComic}/>

          {/* Input section */}
          <div className="flex items-center mb-4 h-12">
            <Input
              style={{ width: '10rem' }}
              value={blogTitle}
              placeholder="Nhập tiêu đề bài viết"
              className="!flex-shrink-0 rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBlogTitle(e.target.value)}
            />
            <div className="ml-6 font-bold text-gray-800">
              Thuộc truyện:{' '}
              {blogComic === null ? 'Chưa chọn truyện' : blogComic.title}
            </div>
          </div>
          <div className={'py-2 font-bold text-xl'}>
            Giới thiệu truyện
          </div>
          <TextArea
            showCount
            maxLength={300}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Viết lời giới thiệu về bài viết"
            style={{ height: 100, resize: 'none', marginBottom: '20px' }}
            value={introduction}
          />
          {/* RichTextEditor */}
          <RichTextEditor
            result={result}
            setResult={setResult}
            setPreview={setPreview}
            isImageSaved={isImageSaved}
            setIsImageSaved={setIsImageSaved}
            saveBlog={updateBlog}
          />

          {/* Preview section */}
          <div className="text-left mt-9 text-xl font-semibold text-gray-900">
            Bản xem trước
          </div>
          <Divider className="!mt-0"/>

          <div className="border rounded-md p-4 bg-gray-50 mt-4">
            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: preview }}
            ></div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="col-span-3 p-4 bg-white rounded-lg shadow-sm">
          <EditCharacterInfo
            character={character}
            setCharacter={setCharacter}
            setBlogCharacterThumbnail={setBlogCharacterThumbnail}
            blogCharacterThumbnail={
              blogCharacter !== null ? blogCharacterThumbnail : null
            }
          />
        </div>
      </div>
    </>
  )
}
