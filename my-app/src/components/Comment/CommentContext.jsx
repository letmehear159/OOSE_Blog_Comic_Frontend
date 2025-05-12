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

export function CommentProvider({ blogId, currentUserRole = 'user', blogOwnerId, children }) {
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
    // Thêm thông tin về người dùng và role
    const enrichedComment = {
      ...comment,
      id: Date.now().toString(), // ID tạm thời cho comment mới
      createdAt: new Date().toISOString(),
      role: comment.userRole || currentUserRole,
      // Trong trường hợp thực tế, userId sẽ được lấy từ hệ thống xác thực
      userId: 'current-user-id',
      blogOwnerId: blogOwnerId, // Lưu trữ id của chủ blog để kiểm tra quyền sau này
      status: 'approved' // Mặc định bình luận sẽ được phê duyệt ngay lập tức
    };
    
    // Thêm comment mới vào state để hiển thị ngay lập tức
    if (comment.parentId) {
      // Nếu là reply cho comment khác
      setComments(prevComments => {
        return prevComments.map(prevComment => {
          if (prevComment.id === comment.parentId) {
            // Thêm reply vào children của comment cha
            const updatedChildren = [...(prevComment.children || []), enrichedComment];
            return { ...prevComment, children: updatedChildren };
          } else if (prevComment.children && prevComment.children.length > 0) {
            // Kiểm tra các comment con nếu có
            const updatedChildren = prevComment.children.map(child => {
              if (child.id === comment.parentId) {
                const childrenOfChild = [...(child.children || []), enrichedComment];
                return { ...child, children: childrenOfChild };
              }
              return child;
            });
            return { ...prevComment, children: updatedChildren };
          }
          return prevComment;
        });
      });
    } else {
      // Nếu là comment gốc
      setComments(prevComments => [...prevComments, enrichedComment]);
    }
    
    // Gọi API để lưu vào database (trong trường hợp thực tế)
    await createComment(enrichedComment);
    // Tùy chọn: fetch lại comments từ server để đồng bộ dữ liệu
    // await fetchComments();
  };

  // Sửa comment
  const handleUpdateComment = async (commentId, content) => {
    // Cập nhật trực tiếp trong state để hiển thị thay đổi ngay lập tức
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content };
        } else if (comment.children && comment.children.length > 0) {
          const updatedChildren = comment.children.map(child => 
            child.id === commentId ? { ...child, content } : child
          );
          return { ...comment, children: updatedChildren };
        }
        return comment;
      });
    });
    
    // Gọi API để cập nhật comment trong database
    await updateComment(commentId, content);
  };

  // Xóa comment
  const handleDeleteComment = async (commentId) => {
    // Xóa trực tiếp trong state để hiển thị thay đổi ngay lập tức
    setComments(prevComments => {
      // Xóa nếu là comment gốc
      const filteredComments = prevComments.filter(comment => comment.id !== commentId);
      // Xóa nếu là comment con
      return filteredComments.map(comment => {
        if (comment.children && comment.children.length > 0) {
          return {
            ...comment,
            children: comment.children.filter(child => child.id !== commentId)
          };
        }
        return comment;
      });
    });
    
    // Gọi API để xóa comment trong database
    await deleteComment(commentId);
  };

  // Lấy children của 1 comment (nếu cần lazy load)
  const handleGetChildComments = async (commentId) => {
    return await getChildComments(commentId);
  };

  // Kiểm tra xem người dùng hiện tại có quyền quản lý comment hay không
  const canManageComments = useCallback(() => {
    return currentUserRole === 'admin' || 
           (currentUserRole === 'blogger' && blogOwnerId === 'current-user-id');
  }, [currentUserRole, blogOwnerId]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        fetchComments,
        handleAddComment,
        handleUpdateComment,
        handleDeleteComment,
        handleGetChildComments,
        currentUserRole,
        canManageComments
      }}
    >
      {children}
    </CommentContext.Provider>
  );
} 