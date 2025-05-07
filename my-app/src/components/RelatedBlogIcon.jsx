import { Avatar, Divider, Image } from 'antd'
import { IMAGE_URL } from '../constants/images.js'
import { URL_BACKEND_IMAGES } from '../api/userApi.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBlogInsightsOfThisCharacter, getListRelatedCharacter } from '../services/blogService.js'

const loadListBlog = (characters) => {
  return (
    <>
      {characters.map(char => (
        <div key={char.id} className={'my-4'}>
          <Avatar src={`${URL_BACKEND_IMAGES}/${char.thumbnail}`} className={'!w-[40px] !h-[40px] !object-fill'}/>
        </div>
      ))
      }
    </>
  )
}
export const RelatedBlogIcon = ({ hasBlog, blogComic, blogCharacterId }) => {

  const [relatedCharacters, setRelatedCharacters] = useState(null)
  const [relatedInsightBlogs, setRelatedInsightBlogs] = useState(null)
  const getCharacter = async () => {
    try {
      const res = await getListRelatedCharacter(blogComic.id)
      setRelatedCharacters(res)
    } catch (error) {
      message.error('Không thể lấy danh sách nhân vật ')
    }
  }
  const getInsight = async () => {
    try {
      const res = await getBlogInsightsOfThisCharacter(blogCharacterId)
      setRelatedInsightBlogs(res)
    } catch (error) {
      message.error('Không thể lấy danh sách các bài viêt cảm hứng từ nhân vật này ')
    }
  }
  useEffect(() => {
    if (blogComic !== null) {
      getCharacter()
    }
    if (blogCharacterId !== null) {
      getInsight()
    }
  }, [blogComic, blogCharacterId])

  return (
    <>
      <div className={'h-[700px] mt-20'}>

        {hasBlog === true && (
          <>
            <Avatar src={`${URL_BACKEND_IMAGES}/${blogComic.thumbnail}`}
                    className={'!w-[40px] !h-[40px] !object-fill'}/>
            {relatedCharacters !== null && loadListBlog(relatedCharacters)}
          </>
        )}
        <div>
          {
            relatedInsightBlogs !== null &&
            <>
              {loadListBlog(relatedInsightBlogs)}
            </>
          }
        </div>
      </div>
    </>
  )
}