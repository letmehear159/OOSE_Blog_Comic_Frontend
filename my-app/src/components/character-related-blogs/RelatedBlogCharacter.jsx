import { Avatar, Image, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
  getInsightsComicAPI,
  getRelatedCharactersAPI,
} from '../../services/blogService.js'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { ROUTES } from '../../constants/api.js'

const loadListBlog = ({ blogs, type }) => {
  return (
    <>
      {blogs.map((char) => (
        <div key={char.id}>
          <div className={'flex my-4 mx-1 items-center rounded bg-[#FFFFFF]'}>
            <Image
              src={`${URL_BACKEND_IMAGES}/${char.thumbnail}`}
              className={'!w-[80px] !mr-2 !h-[80px]' + ' !object-cover'}
            />
            <Link
              className={'!text-[#520044] !underline'}
              to={type === 'Character' ? `${ROUTES.getViewCharacter(char.id)}` : `${ROUTES.getViewComic(char.id)}`}
            >
              {char.title}
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

const loadBlog = ({ blog, type }) => {
  return (
    <>
      <div
        className={'p-1 font-bold underline text-[#520044] text-xl !text-left '}
      >
      </div>
      <Image
        src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
        className={'!border  !rounded' + ' '}
      />
      <Link to={type === 'Character' ? `${ROUTES.getViewCharacter(blog.id)}` : `${ROUTES.getViewComic(blog.id)}`}>
        <div className={'!p-2 hover:bg-[#D9D8D8] hover:underline text-[18px] text-black mb-5'}>
          {blog.title}
        </div>
      </Link>
    </>
  )
}

const loadListBlogIcon = (blogs) => {
  return (
    <>
      {blogs.map((char) => (
        <div key={char.id} className={'my-4'}>
          <Avatar
            src={`${URL_BACKEND_IMAGES}/${char.thumbnail}`}
            className={'!w-[60px] !h-[60px] !object-fill'}
          />
        </div>
      ))}
    </>
  )
}

const loadBlogIcon = (blog) => {
  return (
    <>
      <Avatar
        src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
        className={'!w-[60px] !h-[60px] !object-fill'}
      />
    </>
  )
}
export const RelatedBlogCharacter = ({
  hasBlog,
  blogComic,
  blogCharacterId,
  blogType,
  blogInsight,
  loadType,
}) => {
  const [relatedCharacters, setRelatedCharacters] = useState(null)
  const [relatedInsightBlogs, setRelatedInsightBlogs] = useState(null)
  const [relatedBlogComic, setRelatedBlogComic] = useState(null)

  const getCharacters = async (blogId) => {
    try {
      const res = await getRelatedCharactersAPI(blogId)
      setRelatedCharacters(res)
    } catch (error) {
      message.error('Không thể lấy danh sách nhân vật ')
    }
  }
  const getInsight = async (blogId) => {
    try {
      const res = await getInsightsComicAPI(blogId)
      setRelatedInsightBlogs(res)
    } catch (error) {
      message.error(
        'Không thể lấy danh sách các bài viêt cảm hứng từ nhân vật này '
      )
    }
  }

  const getComic = async (blogId) => {
    try {
      const res = await getBlogComicAPI(blogId)
      setRelatedBlogComic(res)
    } catch (error) {
      message.error('Không thể lấy bài viết về truyện liên quan')
    }
  }
  const getCharacter = async (blogId) => {
    try {
      const res = await getBlogCharacterAPI(blogId)
      setRelatedCharacters(res)
    } catch (error) {
      message.error('Không thể lấy bài viết về truyện liên quan')
    }
  }

  useEffect(() => {
    if (blogType === 'Character') {
      if (blogComic !== null) {
        getCharacters(blogComic.id)
      }
      if (blogCharacterId !== null) {
        getInsight(blogCharacterId)
      }
    } else if (blogType === 'Comic') {
      if (blogComic !== null) {
        getCharacters(blogComic.id)
        getInsight(blogComic.id)
      }
    } else if (blogType === 'Insight') {
      getComic(blogInsight.comicId)
      getCharacter(blogInsight.blogCharacterId)
    }
  }, [blogComic, blogCharacterId, blogType])
  return (
    <>
      {loadType === 'Full' && (
        <div className={'h-[700px] overflow-y-scroll'}>
          {blogType !== null && blogType === 'Character' && (
            <>
              {hasBlog === true && (
                <>
                  <div className={'p-1  hover:cursor-pointer'}>
                    {blogComic !== undefined && loadBlog({ blog: blogComic, type: 'Comic' })}
                    {relatedCharacters !== null &&
                      relatedCharacters.length > 0 && (
                        <>
                          <div
                            className={
                              'p-1 font-bold underline text-[#520044] text-xl !text-left  underline-offset-4'
                            }
                          >
                            Nhân vật khác
                          </div>

                          {loadListBlog({ blogs: relatedCharacters, type: 'Character' })}
                        </>
                      )}
                  </div>
                </>
              )}
              {relatedInsightBlogs !== null && relatedInsightBlogs !== undefined &&
                relatedInsightBlogs.length > 0 && (
                  <div>
                    {
                      <>
                        <div
                          className={
                            ' font-bold underline text-[#520044] text-xl !text-left  underline-offset-6'
                          }
                        >
                          Bài viết bình luận về nhân vật
                        </div>

                        {loadListBlog({ blogs: relatedInsightBlogs, type: 'Comic' })}
                      </>
                    }
                  </div>
                )}
            </>
          )}

          {blogType !== null && blogType === 'Comic' && (
            <>
              <div className={' p-1 hover:cursor-pointer'}>
                {relatedCharacters !== null && relatedCharacters.length > 0 && (
                  <>
                    <div
                      className={
                        ' font-bold underline text-[#520044] text-xl !text-left  underline-offset-4'
                      }
                    >
                      Bài viết về nhân vật thuộc truyện:
                    </div>

                    {loadListBlog({ blogs: relatedCharacters, type: 'Comic' })}
                  </>
                )}
                {relatedInsightBlogs !== null &&
                  relatedInsightBlogs.length > 0 && (
                    <>
                      <div
                        className={
                          ' font-bold underline text-[#520044] text-xl !text-left  underline-offset-4'
                        }
                      >
                        Bài viết bình luận về truyện:
                      </div>

                      {loadListBlog({ blogs: relatedInsightBlogs, type: 'Comic' })}
                    </>
                  )}
              </div>
            </>
          )}

          {blogType !== null && blogType === 'Insight' && (
            <>
              <div className={' p-1 hover:cursor-pointer '}>
                {relatedBlogComic !== null && relatedBlogComic !== undefined && (
                  <>
                    <div
                      className={
                        ' font-bold underline text-[#520044] text-xl !text-left  underline-offset-4 mb-3'
                      }
                    >
                      Truyện/Tiểu thuyết liên quan
                    </div>

                    {loadBlog({ blog: relatedBlogComic, type: 'Comic' })}
                  </>
                )}
                {relatedCharacters !== null && relatedCharacters !== undefined && (
                  <>
                    <div
                      className={
                        ' font-bold underline text-[#520044] text-xl !text-left  underline-offset-4 mb-3'
                      }
                    >
                      Bài viết về nhân vật liên quan
                    </div>

                    {loadBlog({ blog: relatedCharacters, type: 'Character' })}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
      {loadType === 'Icon' && (
        <div className={'h-[700px] mt-20'}>
          {blogType !== null && blogType === 'Character' && (
            <>
              {hasBlog === true && (
                <>
                  {loadBlogIcon(blogComic)}
                  {relatedCharacters !== null &&
                    relatedCharacters.length > 0 &&
                    loadListBlogIcon(relatedCharacters)}
                </>
              )}
              <div>
                {relatedInsightBlogs !== null &&
                  relatedInsightBlogs.length > 0 && (
                    <>{loadListBlogIcon(relatedInsightBlogs)}</>
                  )}
              </div>
            </>
          )}
          {blogType !== null && blogType === 'Comic' && (
            <>
              {relatedCharacters !== null && relatedCharacters.length > 0 && (
                <>{loadListBlogIcon(relatedCharacters)}</>
              )}
              {relatedInsightBlogs !== null &&
                relatedInsightBlogs.length > 0 && (
                  <>{loadListBlogIcon(relatedInsightBlogs)}</>
                )}
            </>
          )}

          {blogType !== null && blogType === 'Insight' && (
            <>
              {relatedBlogComic !== null && relatedBlogComic !== undefined && relatedBlogComic && (
                <>{loadBlogIcon(relatedBlogComic)}</>
              )}
              {relatedCharacters !== null && <>{loadBlogIcon(relatedCharacters)}</>}
            </>
          )}
        </div>
      )}
    </>
  )
}
