import { Card, Divider, Empty, message, Spin } from 'antd'
import { CommentProvider } from '../../context/CommentContext.jsx'
import CommentBox from './CommentBox.jsx'
import CommentList from './CommentList.jsx'
import { useContext, useEffect, useState } from 'react'
import { addCommentToBlogAPI, getHighestCommentApi } from '../../services/commentService.js'
import { AuthContext } from '../../context/auth.context.jsx'

export const Comment = ({ blogId }) => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState(null)
  const userRole = user !== null ? user.role.toLowerCase() : 'anonymous'
  useEffect(() => {
    getHighestComment()
  }, [blogId])

  const getHighestComment = async () => {
    try {
      const res = await getHighestCommentApi(blogId)
      setComments(res)

    } catch (err) {
      message.error(err.data)
    }
  }
  return (
    <>

      <Divider orientation="left">Bình luận</Divider>
      <CommentProvider blogId={blogId}>
        {loading ? (
          <div className="flex justify-center my-4">
            <Spin/>
          </div>
        ) : (
          <>
            <div className={'flex justify-center '} id={'comment'}>
              <div className="mb-4 w-[825px] !ml-11  !px-0 !bg-transparent !border-none">
                <CommentBox
                  setComments={setComments}
                  comments={comments}
                  blogId={blogId}
                  userId={user !== null ? user.id : null}
                  onSubmit={addCommentToBlogAPI}
                  currentUserRole={userRole}
                />
              </div>
            </div>
            <Divider/>

            {comments !== null ? (
              <CommentList
                setComments={setComments}
                comments={comments}
                blogId={blogId}
                currentUserRole={userRole}
              />
            ) : (
              <Empty description="Chưa có bình luận nào"/>
            )}

          </>
        )}
      </CommentProvider>
    </>

  )
}