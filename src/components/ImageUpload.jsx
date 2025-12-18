import React, { useEffect, useState } from "react";

const ImageUpload = ({ imageData, setImageData }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        setPreview(imageData);
    }, [imageData]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match("image.*")) {
            alert("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreview(event.target.result);
            setImageData(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="form-group">
            <label htmlFor="postImage">Image (optional)</label>
            <div className="image-upload-container">
                <div className="upload-button-container">
                    <label htmlFor="imageUpload" className="upload-button">
                        <i className="fas fa-cloud-upload-alt"></i> Upload Image
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                    />
                </div>
            </div>
            {preview && (
                <div
                    id="imagePreview"
                    className={`image-preview ${preview ? "has-image" : ""}`}
                    style={{
                        backgroundImage: preview ? `url(${preview})` : "none",
                    }}
                ></div>
            )}
        </div>
    );
};

export default ImageUpload;
