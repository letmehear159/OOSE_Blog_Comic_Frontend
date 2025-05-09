import CommentItem from './CommentItem';

function CommentList({ comments, blogId }) {
  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 italic">Chưa có bình luận nào.</div>;
  }
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} blogId={blogId} />
      ))}
    </div>
  );
}

export default CommentList; 