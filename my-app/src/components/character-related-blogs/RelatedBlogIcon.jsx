import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import { getInsightsCharacterAPI, getRelatedCharactersAPI } from '../../services/blogService.js'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'

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
      const res = await getRelatedCharactersAPI(blogComic.id)
      setRelatedCharacters(res)
    } catch (error) {
      message.error('Không thể lấy danh sách nhân vật ')
    }
  }
  const getInsight = async () => {
    try {
      const res = await getInsightsCharacterAPI(blogCharacterId)
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