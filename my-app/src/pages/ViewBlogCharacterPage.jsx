import { useEffect, useState } from "react";
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
} from "../services/blogService.js";
import { Button, Layout, message } from "antd";
import { Character } from "../components/blog/Character.jsx";
import { useParams } from "react-router-dom";
import { customHeadingStyles, customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { Content } from "antd/es/layout/layout.js";
import Sider from "antd/es/layout/Sider.js";
import {
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { RelatedBlogCharacter } from "../components/character-related-blogs/RelatedBlogCharacter.jsx";
import { URL_BACKEND_IMAGES } from '../constants/images.js'
import { BloggerInfo } from '../components/blog/BloggerInfo.jsx'

export const ViewBlogCharacterPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [blogComic, setBlogComic] = useState(null);
  useEffect(() => {
    if (!id) return;

    getBlogCharacterAPI(id)
      .then((res) => {
        setBlog(res);
        if (res.comicId !== null) {
          getBlogComicAPI(res.comicId)
            .then((res) => {
              console.log(">>> Check blog comic ", res);
              setBlogComic(res);
            })
            .catch((err) => {
              message.error("Không thể tải blog.");
            });
        }
      })
      .catch((err) => {
        message.error("Không thể tải blog.");
      });
  }, [id]);

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <style>{customHeadingStyles}</style>
      {!blog ? (
        <div className="text-center p-10 text-gray-500">Đang tải blog...</div>
      ) : (
        <>
          <Layout className="border min-h-screen">
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
                <div className={"flex justify-end"}>
                  <Button
                    className={"!border-r-0 !bg-amber-400"}
                    icon=<LeftOutlined />
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
                        blogType={"Character"}
                        loadType={"Icon"}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={
                        "font-bold text-3xl text-left px-1 underline text-[#520044]"
                      }
                    >
                      Những bài viết liên quan
                    </div>
                    {
                      <RelatedBlogCharacter
                        hasBlog={blogComic !== null}
                        blogComic={blogComic}
                        blogCharacterId={blog.id}
                        blogType={"Character"}
                        loadType={"Full"}
                      />
                    }
                  </>
                )}
              </div>
            </Sider>
            {collapsed === true && (
              <div className={"flex justify-end"}>
                <Button
                  className={"!border-0 !rounded-l-none   !bg-amber-400"}
                  icon=<RightOutlined />
                  onClick={() => setCollapsed(false)}
                />
              </div>
            )}
            <Layout>
              <Content className=" flex justify-between">
                <div className="mx-8">
                  {/* Nội dung blog (giữa) sẽ chiếm 9 cột khi Sider collapse, 6 khi không */}
                  <div className={"my-8"}>

                    <div
                      className={'font-bold py-2 my-2 text-4xl    text-[#333333]'}
                    >
                      {blog.title}
                    </div>
                    <BloggerInfo
                      name={'Gọi bố đi con'}
                      avatarUrl={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                      date={Date.now()}
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
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
};
