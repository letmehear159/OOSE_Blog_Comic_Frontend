import { useContext, useEffect, useState } from 'react'
import {
  getBlogByIdAPI,
  getBlogCharacterAPI,
  getBlogComicAPI,
  getBlogInsightByIdAPI,
} from '../services/blogService.js'
import { Comment } from '../components/Comment/Comment.jsx'
import { Button, Image, Layout, message } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { Content } from 'antd/es/layout/layout.js'
import Sider from 'antd/es/layout/Sider.js'
import {
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { RelatedBlogCharacter } from '../components/character-related-blogs/RelatedBlogCharacter.jsx'
import { SelectedElement } from '../components/blog/SelectedElement.jsx'
import { URL_BACKEND_IMAGES } from '../constants/images.js'
import { BloggerInfo } from '../components/blog/BloggerInfo.jsx'
import { AuthContext } from '../context/auth.context.jsx'
import { formatDatetimeWithTimeFirst } from '../services/helperService.js'
import { ROUTES } from '../constants/api.js'
import PostActions from '../components/PostActions.jsx'
import {
  saveFavouriteBlogAPI,
  removeFavouriteBlogAPI,
  getFavouriteByUserAndBlogAPI, getFavouriteCountBlogAPI,
} from '../services/favoriteService.js'
import { getCommentCountOfBlogAPI } from '../services/commentService.js'
import { saveReactionToABlogAPI } from '../services/reactionService.js'
import { followUserAPI, unfollowUserAPI, fetchAllFollowsAPI, getFollowingByUserAPI } from '../services/followService.js'

export const ViewBlogComicPage = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [blog, setBlog] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const [blogCharacter, setBlogCharacter] = useState(null)
  const [blogComic, setBlogComic] = useState(null)
  const [favouriteId, setFavouriteId] = useState(null)
  const [commentCount, setCommentCount] = useState(null)
  const [saveCount, setSaveCount] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (!id) return
    getBlog(id)
    getCommentCount()
    getFavoriteCount()
    // Kiểm tra đã favourite chưa
    if (user && id) {
      getFavouriteByUserAndBlogAPI(user.id, id)
        .then((res) => {
          if (res && res.id) setFavouriteId(res.id)
          else setFavouriteId(null)
        })
        .catch(() => setFavouriteId(null))
    }
  }, [id, user])
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
  const getBlog = async (id) => {
    try {
      const res = await getBlogByIdAPI(id)
      var finalRes
      if (res.type === 'COMIC') {
        finalRes = await getBlogComicAPI(id)
      } else if (res.type === 'INSIGHT') {
        finalRes = await getBlogInsightByIdAPI(id)
        const blogComicRes = await getBlogComicAPI(finalRes.comicId)
        const blogCharacterRes = await getBlogCharacterAPI(
          finalRes.blogCharacterId
        )
        setBlogComic(blogComicRes)
        setBlogCharacter(blogCharacterRes)
      } else if (res.type === 'CHARACTER') {
        navigate(ROUTES.getViewCharacter(id))
      }
      setBlog(finalRes)
    } catch (e) {
      message.error(e.data)
    }
  }

  useEffect(() => {
    if (user && blog && blog.author && user.id !== blog.author.userId) {
      console.log('user.id:', user.id)
      console.log('blog.author.userId:', blog.author.userId)
      getFollowingByUserAPI(user.id)
        .then(followingList => {
          const found = Array.isArray(followingList) && followingList.some(f => f.blogger?.id === blog.author.userId);
          setIsFollowing(!!found);
          console.log('followingList:', followingList)
          console.log('isFollowing', !!found)
        })
        .catch(() => {
          setIsFollowing(false);
        });
    } else {
      setIsFollowing(false);
    }
  }, [user, blog]);

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

  const handleComment = () => {
    const commentSection = document.getElementById('comment')
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <>
      <style>{customImageAlignStyles}</style>
      {!blog ? (
        <div className="text-center p-10 text-gray-500">Đang tải blog...</div>
      ) : (
        <>
          <Layout className="border min-h-screen">
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              width={340}
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

              <div className="text-center  py-4 font-bold">
                {collapsed ? (
                  <>
                    {blog.type === 'COMIC' && (
                      <RelatedBlogCharacter
                        blogComic={blog}
                        blogType={'Comic'}
                        loadType={'Icon'}
                      />
                    )}
                    {blog.type === 'INSIGHT' && (
                      <RelatedBlogCharacter
                        blogComic={blog}
                        blogType={'Comic'}
                        loadType={'Icon'}
                      />
                    )}
                    )
                  </>
                ) : (
                  <>
                    <div
                      className={
                        'font-bold text-3xl text-left px-1 underline mb-10 text-[#520044]'
                      }
                    >
                      Những bài viết liên quan:
                    </div>
                    {blog.type === 'COMIC' ? (
                      <RelatedBlogCharacter
                        blogComic={blog}
                        blogType={'Comic'}
                        loadType={'Full'}
                      />
                    ) : (
                      <RelatedBlogCharacter
                        blogType={'Insight'}
                        blogInsight={blog}
                        loadType={'Full'}
                      />
                    )}
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
                {/* Cột trái - PostActions với sticky */}
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

                {/* Cột giữa - Nội dung blog */}
                <div className="max-w-[700px] grow">
                  <div className="font-bold py-2 my-2 text-4xl text-[#333333]">
                    {blog.title}
                  </div>
                  <BloggerInfo
                    name={blog.author.displayName}
                    avatarUrl={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                    date={formatDatetimeWithTimeFirst(blog.createdAt)}
                    isFollowing={isFollowing}
                    onFollow={async () => {
                      if (!user) {
                        message.error('Bạn cần đăng nhập để theo dõi');
                        return;
                      }
                      try {
                        await followUserAPI(blog.author.userId, user.id);
                        // Lấy lại danh sách following mới nhất giống như cách xử lý favouriteId
                        const followingList = await getFollowingByUserAPI(user.id);
                        const found = Array.isArray(followingList) && followingList.some(f => f.blogger?.userId === blog.author.userId);
                        setIsFollowing(!!found);
                        message.success('Theo dõi thành công!');
                      } catch (e) {
                        message.error('Theo dõi thất bại!');
                      }
                    }}
                    onUnfollow={async () => {
                      if (!user) {
                        return;
                      }
                      try {
                        await unfollowUserAPI(blog.author.userId, user.id);
                        setIsFollowing(false);
                        message.success('Bỏ theo dõi thành công!');
                      } catch (e) {
                        message.error('Bỏ theo dõi thất bại!');
                      }
                    }}
                    authorId={blog.author.userId}
                  />
                  <SelectedElement
                    selected={blog.categories}
                    type={'Thể loại'}
                    color={'blue'}
                  />
                  <SelectedElement
                    selected={blog.tags}
                    type={'Tag'}
                    color={'amber'}
                  />

                  {blog.type === 'INSIGHT' && (
                    <div className="my-5 text-[18px]">
                      <span>
                        Viết về nhân vật:{' '}
                        <span
                          className={
                            blogCharacter
                              ? 'text-blue-600'
                              : 'text-gray-500 italic'
                          }
                        >
                          {blogCharacter === null ? (
                            ''
                          ) : (
                            <Link to={'/test/#'} target={'_blank'}>
                              {blogCharacter.title}
                            </Link>
                          )}
                        </span>
                      </span>
                      <span className="mx-2">|</span>
                      <span>
                        Trong truyện:{' '}
                        <span
                          className={
                            blogComic ? 'text-blue-600' : 'text-gray-500 italic'
                          }
                        >
                          {blogComic === null ? (
                            ''
                          ) : (
                            <Link to={'/test/#'} target={'_blank'}>
                              {blogComic.title}
                            </Link>
                          )}
                        </span>
                      </span>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Image
                      style={{
                        maxHeight: '650px',
                        maxWidth: '930px',
                      }}
                      src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                    />
                  </div>

                  <div className="my-8">
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>
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
