// src/components/CommentList.tsx
import React from "react";
import CommentItem from "./CommentItem";

interface Comment {
  _id: string;
  text: string;
  createdAt: string;
  user: {
    _id: string;
    username: string;
  };
}

interface CommentListProps {
  comments: Comment[];
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onEdit, onDelete }) => {
  return (
    <div>
      {comments.length === 0 ? (
        <p>אין תגובות עדיין.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default CommentList;
