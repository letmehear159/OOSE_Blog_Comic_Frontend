import { Image, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getInsightsCharacterAPI, getRelatedCharactersAPI } from '../../services/blogService.js'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'

const characters = [
  {
    title: 'Thác Sâm',
    id: 11,
    thumbnail: '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp'
  },
  {
    title: 'Tiên nhân chỉ lộ lộ lộ lộ',
    id: 11,
    thumbnail: '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp'
  }
  ,
  {
    title: 'Thác Sâm',
    id: 11,
    thumbnail: '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp'
  },
  {
    title: 'Thác Sâm',
    id: 11,
    thumbnail: '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp'
  },
]
const loadListBlog = (characters) => {
  return (
    <>
      {characters.map(char => (
        <div key={char.id}>
          <div className={'flex my-4 mx-1 items-center rounded bg-[#FFFFFF]'}>
            <Image src={`${URL_BACKEND_IMAGES}/${char.thumbnail}`} className={'!w-[60px] !mr-2 !h-[60px]' +
              ' !object-cover'}/>
            <Link className={'!text-[#520044] !underline'} to={`/character/${char.id}`}>
              {char.title}
            </Link>
          </div>
        </div>
      ))
      }
    </>
  )
}
export const RelatedBlog = ({ hasBlog, blogComic, blogCharacterId }) => {
  const [relatedCharacters, setRelatedCharacters] = useState(null)
  const [relatedInsightBlogs, setRelatedInsightBlogs] = useState(null)
  console.error('>>> relatedCharacters', relatedCharacters)

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
      <div className={'h-[700px] overflow-y-scroll'}>

        {hasBlog === true && (
          <>
            <div className={'p-1  hover:cursor-pointer'}>
              <div className={'p-1 font-bold underline text-[#520044] text-xl !text-left'}>
                Tiểu thuyết
              </div>
              <Image src={`${URL_BACKEND_IMAGES}/${blogComic.thumbnail}`} className={'!border  !rounded' +
                ' '}/>
              <Link to={'/'}>
                <div className={'!p-2 hover:bg-[#D9D8D8] hover:underline text-black'}>
                  {blogComic.title}
                </div>
              </Link>
              <div className={'p-1 font-bold underline text-[#520044] text-xl !text-left  underline-offset-4'}>
                Nhân vật khác
              </div>

              {relatedCharacters !== null && loadListBlog(relatedCharacters)}
            </div>
          </>
        )}
        {
          relatedInsightBlogs !== null &&
          <div>
            {
              <>
                <div className={'p-1 font-bold underline text-[#520044] text-xl !text-left  underline-offset-6'}>
                  Cảm hứng từ nhân vật
                </div>

                {loadListBlog(relatedInsightBlogs)}
              </>
            }
          </div>
        }

      </div>
    </>
  )
}