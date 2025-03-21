import React from "react";

interface Comment {
  _id: string;
  text: string;
  createdAt: string;
  user: {
    _id: string;
    username: string;
  };
}

interface CommentItemProps {
  comment: Comment;
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
  currentUserId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onEdit, onDelete, currentUserId }) => {
  // המרת המזהים למחרוזת – אם כבר אינם מחרוזת
  const commentUserId = comment.user._id ? comment.user._id.toString() : "";
  const currentId = currentUserId ? currentUserId.toString() : "";

  // הדפסה לצורך בדיקה – יש להסיר את ההדפסות לאחר ווידוא שהערכים נכונים
  console.log("Comment user id:", commentUserId);
  console.log("Current user id:", currentId);

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px", borderRadius: "4px", backgroundColor: "#fff" }}>
      <p style={{ marginBottom: "4px" }}>
        <strong>{comment.user.username}</strong> - {new Date(comment.createdAt).toLocaleString()}
      </p>
      <p style={{ marginBottom: "4px" }}>{comment.text}</p>
      {commentUserId === currentId && (
        <div>
          <button
            onClick={() => {
              const newText = prompt("עדכן את התגובה:", comment.text);
              if (newText && newText.trim() !== "") {
                onEdit(comment._id, newText);
              }
            }}
            style={{ marginRight: "8px" }}
          >
            ערוך
          </button>
          <button onClick={() => onDelete(comment._id)}>מחק</button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
