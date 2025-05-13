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
import { IMAGE_URL, URL_BACKEND_IMAGES } from '../constants/images.js'
import { BloggerInfo } from '../components/blog/BloggerInfo.jsx'
import { AuthContext } from '../context/auth.context.jsx'
import { DateTime } from 'luxon'
import { formatDatetimeWithTimeFirst } from '../services/helperService.js'
import { ROUTES } from '../constants/api.js'

export const ViewBlogComicPage = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const [blogCharacter, setBlogCharacter] = useState(null)
  const [blogComic, setBlogComic] = useState(null)
  const navigate=useNavigate()
  useEffect(() => {
    if (!id) return
    getBlog(id)
  }, [id])

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
      } else if(res.type === 'CHARACTER'){
        navigate(ROUTES.getViewCharacter(id))
      }
      setBlog(finalRes)
    } catch (e) {
      message.error(e.data)
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
                    {blog.type === 'COMIC' && <RelatedBlogCharacter
                      blogComic={blog}
                      blogType={'Comic'}
                      loadType={'Icon'}
                    />}

                    {blog.type === 'INSIGHT' &&
                      <RelatedBlogCharacter
                        blogComic={blog}
                        blogType={'Comic'}
                        loadType={'Icon'}
                      />}
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
              <Content className=" flex justify-between">
                <div className=" p-30">
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
                    <div className={'my-5 text-[18px]'}>
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
                  <div className={'flex justify-center'}>
                    <Image
                      style={{
                        maxHeight: '650px',
                        maxWidth: '930px',
                      }}
                      src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                    />
                  </div>


                  {/* Nội dung blog (giữa) sẽ chiếm 9 cột khi Sider collapse, 6 khi không */}
                  <div className={'my-8'}>
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
