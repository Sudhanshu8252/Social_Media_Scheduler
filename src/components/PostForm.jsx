import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";

const platformsList = ["twitter", "facebook", "instagram", "linkedin"];

const PostForm = ({ onSubmit, postToEdit, onEditComplete }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(getDefaultDate());
    const [time, setTime] = useState(getDefaultTime());
    const [platforms, setPlatforms] = useState([]);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setContent(postToEdit.content);
            setDate(postToEdit.scheduledFor.toISOString().split("T")[0]);
            setTime(postToEdit.scheduledFor.toTimeString().slice(0, 5));
            setPlatforms(postToEdit.platforms);
            setImageData(postToEdit.image || null);
        }
    }, [postToEdit]);

    function getDefaultDate() {
        const today = new Date();
        return today.toISOString().split("T")[0];
    }

    function getDefaultTime() {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
        return now.toTimeString().slice(0, 5);
    }

    const togglePlatform = (platform) => {
        setPlatforms((prev) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content || platforms.length === 0 || !date || !time) {
            alert("Please fill all fields");
            return;
        }

        const [year, month, day] = date.split("-");
        const [hours, minutes] = time.split(":");
        const scheduledFor = new Date(year, month - 1, day, hours, minutes);

        if (scheduledFor < new Date()) {
            alert("Cannot schedule posts in the past");
            return;
        }

        const post = {
            id: postToEdit
                ? postToEdit.id
                : Math.random().toString(36).slice(2, 9),
            title,
            content,
            scheduledFor,
            platforms,
            image: imageData,
            created: postToEdit ? postToEdit.created : new Date(),
        };

        if (postToEdit) {
            onEditComplete(post);
        } else {
            onSubmit(post);
        }

        setTitle("");
        setContent("");
        setImageData(null);
        setPlatforms([]);
        setDate(getDefaultDate());
        setTime(getDefaultTime());
    };

    return (
        <div className="form-container">
            <h2>Create Post</h2>
            <div className="post-form">
                <form id="postForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="postTitle">Title</label>
                        <input
                            type="text"
                            id="postTitle"
                            placeholder="Enter post title"
                            className="input-field"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postContent">Content</label>
                        <textarea
                            id="postContent"
                            placeholder="What's on your mind?"
                            rows="4"
                            className="input-field"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    <ImageUpload
                        imageData={imageData}
                        setImageData={setImageData}
                    />

                    <div className="form-group">
                        <label>Platforms</label>
                        <div id="platforms" className="platform-selector">
                            {platformsList.map((platform) => (
                                <button
                                    key={platform}
                                    type="button"
                                    data-platform={platform}
                                    className={`platform-button ${
                                        platforms.includes(platform)
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => togglePlatform(platform)}
                                >
                                    <i className={`fab fa-${platform}`}></i>{" "}
                                    {platform}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Schedule Date & Time</label>
                        <div className="date-time-container">
                            <div className="date-input-container">
                                <label
                                    htmlFor="scheduleDate"
                                    className="input-label"
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="scheduleDate"
                                    className="input-field"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="time-input-container">
                                <label
                                    htmlFor="scheduleTime"
                                    className="input-label"
                                >
                                    Time
                                </label>
                                <input
                                    type="time"
                                    id="scheduleTime"
                                    className="input-field"
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="schedule-button">
                        {postToEdit ? "Update Post" : "Schedule Post"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
