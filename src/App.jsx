import React, { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Toast from "./components/Toast";

const App = () => {
    const [toast, setToast] = useState(null);
    const [postBeingEdited, setPostBeingEdited] = useState(null);
    const [scheduledPosts, setScheduledPosts] = useState(() => {
        const saved = localStorage.getItem("scheduledPosts");
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.map((post) => ({
                ...post,
                scheduledFor: new Date(post.scheduledFor),
                created: new Date(post.created),
            }));
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("scheduledPosts", JSON.stringify(scheduledPosts));
    }, [scheduledPosts]);

    const addPost = (post) => {
        setScheduledPosts([...scheduledPosts, post]);
        setToast({ message: "Post scheduled successfully!", type: "success" });
    };

    const deletePost = (postId) => {
        setScheduledPosts(scheduledPosts.filter((p) => p.id !== postId));
        setToast({ message: "Post deleted successfully!", type: "success" });
    };

    const handleEditComplete = (updatedPost) => {
        setScheduledPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            )
        );
        setPostBeingEdited(null);
        setToast({ message: "Post updated successfully!", type: "success" });
    };

    return (
        <div className="min-h-screen">
            <div className="header">
                <h1>Social Media Scheduler</h1>
                <p>Plan and schedule your social media content in one place</p>
            </div>
            <div className="content-container">
                <PostForm
                    onSubmit={addPost}
                    postToEdit={postBeingEdited}
                    onEditComplete={handleEditComplete}
                />
                <PostList
                    posts={scheduledPosts}
                    onDelete={deletePost}
                    onEdit={setPostBeingEdited}
                />
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default App;
