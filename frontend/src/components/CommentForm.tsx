import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
      <textarea
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "80px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button type="submit" className="btn" style={{ marginTop: "8px" }}>
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
