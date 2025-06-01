"use client";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function HomeClient() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const router = useRouter();

  const token = getCookie("accessToken");

  useEffect(() => {
    if (!token) {
      router.push("/auth/sign-in");
      return;
    }

    const getUser = async () => {
      const resp = await fetch("http://localhost:4000/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (resp.status === 200) {
        setUser(data);
      } else {
        deleteCookie("accessToken");
        router.push("/auth/sign-in");
      }
    };

    const getPosts = async () => {
      const resp = await fetch("http://localhost:4000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      if (resp.status === 200) {
        setPosts(data);
      }
    };

    getUser();
    getPosts();
  }, [token, router]);

  const fetchPosts = async () => {
    const resp = await fetch("http://localhost:4000/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    if (resp.status === 200) {
      setPosts(data);
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm("Are you sure you wanna delete your account?")) return;

    const resp = await fetch(`http://localhost:4000/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (resp.status === 200) {
      deleteCookie("accessToken");
      alert("User and their posts deleted successfully");
      router.push("/auth/sign-in");
    } else {
      const data = await resp.json();
      alert(`Failed to delete user: ${data.error}`);
    }
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill title and content");
      return;
    }

    const resp = await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (resp.status === 201) {
      alert("Post created successfully");
      setTitle("");
      setContent("");
      fetchPosts();
    } else {
      const data = await resp.json();
      alert(`Failed to create post: ${data.error}`);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const resp = await fetch(`http://localhost:4000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (resp.status === 200) {
      alert("Post deleted successfully");
      fetchPosts();
    } else {
      const data = await resp.json();
      alert(`Failed to delete post: ${data.error}`);
    }
  };

  const startEditingPost = (post: any) => {
    setEditingPostId(post._id);
    setEditingTitle(post.title);
    setEditingContent(post.content);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditingTitle("");
    setEditingContent("");
  };

  const handleUpdatePost = async () => {
    if (!editingTitle.trim() || !editingContent.trim()) {
      alert("Please fill title and content");
      return;
    }

    const resp = await fetch(`http://localhost:4000/posts/${editingPostId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editingTitle, content: editingContent }),
    });

    if (resp.status === 200) {
      alert("Post updated successfully");
      setEditingPostId(null);
      setEditingTitle("");
      setEditingContent("");
      fetchPosts();
    } else {
      const data = await resp.json();
      alert(`Failed to update post: ${data.error}`);
    }
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Welcome to Your Blog
      </h1>

      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#f9f9f9",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2>User Info</h2>
        <p>
          <strong>Name:</strong> {user?.fullName || "Loading..."}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "Loading..."}
        </p>
        <button
          onClick={handleDeleteUser}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            marginTop: "1rem",
          }}
          title="Delete your account"
        >
          Delete My Account
        </button>
      </section>

      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#eef6ff",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Create a New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.75rem",
            borderRadius: 5,
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            height: 120,
            padding: "0.5rem",
            marginBottom: "0.75rem",
            borderRadius: 5,
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />
        <button
          onClick={handleCreatePost}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "0.5rem 1.5rem",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          title="Create a new post"
        >
          Create Post
        </button>
      </section>

      <section>
        <h2>Posts</h2>
        {posts.length === 0 && <p>No posts yet.</p>}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {posts.map((post) => (
            <article
              key={post._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: 8,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                backgroundColor: "white",
                position: "relative",
              }}
            >
              {editingPostId === post._id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      marginBottom: "0.5rem",
                      borderRadius: 5,
                      border: "1px solid #ccc",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                    }}
                  />
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    style={{
                      width: "100%",
                      height: 100,
                      padding: "0.5rem",
                      marginBottom: "0.5rem",
                      borderRadius: 5,
                      border: "1px solid #ccc",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                  <button
                    onClick={handleUpdatePost}
                    style={{
                      marginRight: 8,
                      backgroundColor: "#28a745",
                      border: "none",
                      borderRadius: 5,
                      padding: "0.5rem 1rem",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                    title="Save changes"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    style={{
                      backgroundColor: "#6c757d",
                      border: "none",
                      borderRadius: 5,
                      padding: "0.5rem 1rem",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                    title="Cancel editing"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 style={{ marginTop: 0 }}>{post.title}</h3>
                  <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
                  <small
                    style={{
                      color: "#666",
                      display: "block",
                      marginTop: "0.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    By: {post.author?.email || "Unknown author"}
                  </small>

                  {post.author?._id === user?._id && (
                    <>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          backgroundColor: "#dc3545",
                          border: "none",
                          borderRadius: 4,
                          padding: "0.3rem 0.6rem",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                        }}
                        title="Delete this post"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => startEditingPost(post)}
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 70,
                          backgroundColor: "#007BFF",
                          border: "none",
                          borderRadius: 4,
                          padding: "0.3rem 0.6rem",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          marginRight: "20px",
                        }}
                        title="Edit this post"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
