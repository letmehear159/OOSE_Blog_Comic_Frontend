import CommentItem from './CommentItem'
import { ReportProvider } from '../../context/ReportContext.jsx'
import ReportModal from '../Report/ReportModal.jsx'

function CommentList ({ comments, blogId, currentUserRole = 'user' }) {
  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 italic">Chưa có bình luận nào.</div>
  }
  return (
    <div className="space-y-4 mx-4">
      {comments.map(comment => (
        <ReportProvider>
          <CommentItem
            key={comment.id}
            comment={comment}
            blogId={blogId}
            currentUserRole={currentUserRole}
          />
          <ReportModal/>
        </ReportProvider>
      ))}
    </div>
  )
}

export default CommentList