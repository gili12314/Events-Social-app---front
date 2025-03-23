// src/components/CommentItem.tsx
import React from "react";

interface Comment {
  _id: string;
  text: string;
  createdAt: string;
  // המשתמש יכול להיות מחרוזת (מזהה בלבד) או אובייקט עם _id ו־username
  user: string | {
    _id: string;
    username: string;
  };
}

interface CommentItemProps {
  comment: Comment;
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onEdit, onDelete }) => {
  // קריאה לערך של userId מה־localStorage
  const currentUserId = localStorage.getItem("userId") || "";

  // נבדוק אם comment.user הוא מחרוזת או אובייקט
  let commentUserId: string;
  let username: string;
  if (typeof comment.user === "string") {
    commentUserId = comment.user;
    // במקרה זה, אין לנו שם משתמש – ניתן להציג "Unknown" או להשאיר ריק
    username = "Unknown";
  } else {
    commentUserId = comment?.user?._id.toString();
    username = comment?.user?.username;
  }

  // הדפסות לבדיקה – להסרה לאחר ווידוא
  console.log("Comment user id:", commentUserId);
  console.log("Current user id:", currentUserId);

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px", borderRadius: "4px", backgroundColor: "#fff" }}>
      <p style={{ marginBottom: "4px" }}>
        <strong>{username}</strong> - {new Date(comment.createdAt).toLocaleString()}
      </p>
      <p style={{ marginBottom: "4px" }}>{comment.text}</p>
      {commentUserId === currentUserId && (
        <div>
          <button
            onClick={() => {
              const newText = prompt("Update comment:", comment.text);
              if (newText && newText.trim() !== "") {
                onEdit(comment._id, newText);
              }
            }}
            style={{ marginRight: "8px" }}
          >
            Edit
          </button>
          <button onClick={() => onDelete(comment._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
