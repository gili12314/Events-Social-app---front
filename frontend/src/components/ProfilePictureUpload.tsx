import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ProfilePictureUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("לא נבחר קובץ");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axiosInstance.put("/users/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("התמונה עודכנה בהצלחה!");
      console.log("Response:", response.data);
      // אפשר לעדכן גם state גלובלי או לעדכן את הפרופיל במידת הצורך
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("שגיאה בהעלאת התמונה");
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>עדכון תמונת פרופיל</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px", padding: "8px 12px" }}>
        העלאה
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ProfilePictureUpload;
