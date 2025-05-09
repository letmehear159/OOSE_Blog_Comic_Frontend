import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  getCommentsByBlogId,
  getChildComments,
  createComment,
  updateComment,
  deleteComment
} from '../../api/commentApi';

const CommentContext = createContext();

export function useComment() {
  return useContext(CommentContext);
}

export function CommentProvider({ blogId, children }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load parent comments
  const fetchComments = useCallback(async () => {
    setLoading(true);
    const data = await getCommentsByBlogId(blogId);
    setComments(data);
    setLoading(false);
  }, [blogId]);

  // Thêm comment mới (parent hoặc reply)
  const handleAddComment = async (comment) => {
    await createComment(comment);
    await fetchComments();
  };

  // Sửa comment
  const handleUpdateComment = async (commentId, content) => {
    await updateComment(commentId, content);
    await fetchComments();
  };

  // Xóa comment
  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    await fetchComments();
  };

  // Lấy children của 1 comment (nếu cần lazy load)
  const handleGetChildComments = async (commentId) => {
    return await getChildComments(commentId);
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        fetchComments,
        handleAddComment,
        handleUpdateComment,
        handleDeleteComment,
        handleGetChildComments
      }}
    >
      {children}
    </CommentContext.Provider>
  );
} 