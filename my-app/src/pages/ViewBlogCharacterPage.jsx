import { useEffect, useState, useContext } from 'react'
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
} from '../services/blogService.js'
import { Button, Layout, message } from 'antd'
import { Character } from '../components/blog/Character.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { customHeadingStyles, customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { Content } from 'antd/es/layout/layout.js'
import Sider from 'antd/es/layout/Sider.js'
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { RelatedBlogCharacter } from '../components/character-related-blogs/RelatedBlogCharacter.jsx'
import { URL_BACKEND_IMAGES } from '../constants/images.js'
import { BloggerInfo } from '../components/blog/BloggerInfo.jsx'
import { formatDatetimeWithTimeFirst } from '../services/helperService.js'
import { ROUTES } from '../constants/api.js'
import PostActions from '../components/PostActions.jsx'
import {
  saveFavouriteBlogAPI,
  removeFavouriteBlogAPI,
  getFavouriteByUserAndBlogAPI, getFavouriteCountBlogAPI
} from '../services/favoriteService.js'
import { AuthContext } from '../context/auth.context.jsx'
import { Comment } from '../components/Comment/Comment.jsx'
import { getCommentCountOfBlogAPI } from '../services/commentService.js'
import { saveReactionToABlogAPI } from '../services/reactionService.js'

export const ViewBlogCharacterPage = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const [blogComic, setBlogComic] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [favouriteId, setFavouriteId] = useState(null)
  const [commentCount, setCommentCount] = useState(null)
  const [saveCount, setSaveCount] = useState(null)

  const getCommentCount = async () => {
    try {
      const res = await getCommentCountOfBlogAPI(id)
      setCommentCount(res)
    } catch (err) {
      message.error(err.data)

    }
  }
  const getFavoriteCount = async () => {
    try {
      const res = await getFavouriteCountBlogAPI(id)
      setSaveCount(res)
    } catch (err) {
      message.error(err.data)
    }
  }

  useEffect(() => {
    if (!id) return
    getCommentCount()
    getFavoriteCount()
    getBlogCharacterAPI(id)
      .then((res) => {
        setBlog(res)
        if (res.comicId !== null) {
          getBlogComicAPI(res.comicId)
            .then((res) => {
              setBlogComic(res)
            })
            .catch((err) => {
              message.error('Không thể tải blog.')
            })
        }
        // Kiểm tra đã favourite chưa
        if (user && res.id) {
          getFavouriteByUserAndBlogAPI(user.id, res.id)
            .then(favRes => {
              if (favRes && favRes.id) setFavouriteId(favRes.id)
              else setFavouriteId(null)
            })
            .catch(() => setFavouriteId(null))
        }
      })
      .catch((err) => {
        message.error('Không thể tải blog.')
      })
  }, [id, user])
  const handleComment = () => {
    const commentSection = document.getElementById('comment')
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const reactionToBlog = async () => {
    if (user === null) {
      message.error('Bạn chưa đăng nhập')
      return
    }
    try {
      const res = await saveReactionToABlogAPI({ userId: user.id, blogId: blog.id, type: 'Blog', reaction: 'LOVE' })
    } catch (err) {
      message.error(err.data)
    }
  }
  return (
    <>
      <style>{customImageAlignStyles}</style>
      <style>{customHeadingStyles}</style>
      {!blog ? (
        <div className="text-center p-10 text-gray-500">Đang tải blog...</div>
      ) : (
        <>
          <Layout className="border min-h-screen !mb-20">
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              width={260}
              collapsedWidth={80}
              trigger={null}
              className="!bg-[#F5F3F5] border-r"
            >
              {collapsed === false && (
                <div className={'flex justify-end'}>
                  <Button
                    className={'!border-r-0 !bg-amber-400'}
                    icon=<LeftOutlined/>
                  onClick={() => setCollapsed(true)}
                  />
                </div>
              )}

              <div className="text-center py-4 font-bold">
                {collapsed ? (
                  <>
                    <div>
                      <RelatedBlogCharacter
                        hasBlog={blogComic !== null}
                        blogComic={blogComic}
                        blogCharacterId={blog.id}
                        blogType={'Character'}
                        loadType={'Icon'}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={
                        'font-bold text-3xl text-left px-1 underline text-[#520044]'
                      }
                    >
                      Những bài viết liên quan
                    </div>
                    {
                      <RelatedBlogCharacter
                        hasBlog={blogComic !== null}
                        blogComic={blogComic}
                        blogCharacterId={blog.id}
                        blogType={'Character'}
                        loadType={'Full'}
                      />
                    }
                  </>
                )}
              </div>
            </Sider>
            {collapsed === true && (
              <div className={'flex justify-end'}>
                <Button
                  className={'!border-0 !rounded-l-none   !bg-amber-400'}
                  icon=<RightOutlined/>
                onClick={() => setCollapsed(false)}
                />
              </div>
            )}


            <Layout>
              <Content className="flex gap-6 px-10 py-6 justify-center">
                <PostActions
                  likes={blog.reaction || 0}
                  comments={commentCount || 0}
                  saves={saveCount || 0}
                  isSaved={!!favouriteId}
                  onLike={() => {reactionToBlog()}}
                  onComment={() => {handleComment()}}
                  onSave={async (willBeSaved) => {
                    try {
                      if (!user) {
                        message.error('Bạn cần đăng nhập để lưu bài viết')
                        return
                      }
                      if (willBeSaved) {
                        const res = await saveFavouriteBlogAPI(
                          user.id,
                          blog.id
                        )
                        setFavouriteId(res.id)
                        message.success('Đã lưu bài viết')
                      } else {
                        if (favouriteId) {
                          await removeFavouriteBlogAPI(favouriteId)
                          setFavouriteId(null)
                          message.success('Đã bỏ lưu bài viết')
                        }
                      }
                    } catch (err) {
                      message.error('Có lỗi khi lưu/bỏ yêu thích!')
                    }
                  }}
                  onShare={() => {}}
                />
                <div className="mx-8">
                  {/* Nội dung blog (giữa) sẽ chiếm 9 cột khi Sider collapse, 6 khi không */}
                  <div className={'my-8'}>

                    <div
                      className={'font-bold py-2 my-2 text-4xl    text-[#333333]'}
                    >
                      {blog.title}
                    </div>

                    <BloggerInfo
                      name={blog.author.displayName}
                      avatarUrl={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                      date={formatDatetimeWithTimeFirst(blog.createdAt)}
                    />
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>
                </div>
                <div className="mt-22">
                  <Character
                    character={blog.character}
                    thumbnail={blog.thumbnail}
                  />
                </div>
              </Content>
              <Comment blogId={blog.id}/>
            </Layout>
          </Layout>
        </>
      )}
    </>
  )
}
