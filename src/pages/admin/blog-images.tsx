/**
 * Admin page for managing blog images
 * Accessible at /admin/blog-images
 * Protected by server-side authentication
 */

import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import React, { useEffect, useState } from "react";
import BlogImageManager from "@/components/blog-image-manager";
import {
    BlogImageInfo,
    getAllBlogImages,
    getBlogImageStats,
    getBlogsWithoutCloudinaryImages,
} from "@/lib/blog-images";
import { options } from "@/pages/api/auth/options";

const BlogImagesAdminPage: React.FC = () => {
    const [stats, setStats] = useState<ReturnType<typeof getBlogImageStats> | null>(null);
    const [allImages, setAllImages] = useState<BlogImageInfo[]>([]);
    const [nonCloudinaryImages, setNonCloudinaryImages] = useState<BlogImageInfo[]>([]);
    const [activeTab, setActiveTab] = useState<"manager" | "stats" | "list">("manager");

    useEffect(() => {
        // Load blog image data on mount
        setStats(getBlogImageStats());
        setAllImages(getAllBlogImages());
        setNonCloudinaryImages(getBlogsWithoutCloudinaryImages());
    }, []);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            {/* Header */}
            <div
                style={{
                    backgroundColor: "white",
                    borderBottom: "1px solid #e0e0e0",
                    padding: "20px",
                }}
            >
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h1 style={{ margin: 0 }}>Blog Images Administration</h1>
                    <p style={{ color: "#666", marginTop: "10px" }}>
                        Manage and optimize blog images from Cloudinary
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ backgroundColor: "white", borderBottom: "1px solid #e0e0e0" }}>
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        gap: "0",
                    }}
                >
                    <button
                        onClick={() => setActiveTab("manager")}
                        style={{
                            padding: "15px 30px",
                            backgroundColor: activeTab === "manager" ? "#2196f3" : "transparent",
                            color: activeTab === "manager" ? "white" : "#666",
                            border: "none",
                            borderBottom: activeTab === "manager" ? "3px solid #2196f3" : "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: activeTab === "manager" ? "bold" : "normal",
                        }}
                    >
                        Image Manager
                    </button>
                    <button
                        onClick={() => setActiveTab("stats")}
                        style={{
                            padding: "15px 30px",
                            backgroundColor: activeTab === "stats" ? "#2196f3" : "transparent",
                            color: activeTab === "stats" ? "white" : "#666",
                            border: "none",
                            borderBottom: activeTab === "stats" ? "3px solid #2196f3" : "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: activeTab === "stats" ? "bold" : "normal",
                        }}
                    >
                        Statistics
                    </button>
                    <button
                        onClick={() => setActiveTab("list")}
                        style={{
                            padding: "15px 30px",
                            backgroundColor: activeTab === "list" ? "#2196f3" : "transparent",
                            color: activeTab === "list" ? "white" : "#666",
                            border: "none",
                            borderBottom: activeTab === "list" ? "3px solid #2196f3" : "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: activeTab === "list" ? "bold" : "normal",
                        }}
                    >
                        All Images
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
                {activeTab === "manager" && (
                    <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px" }}>
                        <BlogImageManager />
                    </div>
                )}

                {activeTab === "stats" && stats && (
                    <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "30px" }}>
                        <h2>Blog Image Statistics</h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: "20px",
                                marginTop: "30px",
                            }}
                        >
                            <div
                                style={{
                                    padding: "20px",
                                    backgroundColor: "#e3f2fd",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <h3
                                    style={{
                                        margin: "0 0 10px 0",
                                        fontSize: "36px",
                                        color: "#1976d2",
                                    }}
                                >
                                    {stats.total}
                                </h3>
                                <p style={{ margin: 0, color: "#666" }}>Total Blog Images</p>
                            </div>

                            <div
                                style={{
                                    padding: "20px",
                                    backgroundColor: "#e8f5e9",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <h3
                                    style={{
                                        margin: "0 0 10px 0",
                                        fontSize: "36px",
                                        color: "#388e3c",
                                    }}
                                >
                                    {stats.cloudinary}
                                </h3>
                                <p style={{ margin: 0, color: "#666" }}>Using Cloudinary</p>
                            </div>

                            <div
                                style={{
                                    padding: "20px",
                                    backgroundColor: "#fff3e0",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <h3
                                    style={{
                                        margin: "0 0 10px 0",
                                        fontSize: "36px",
                                        color: "#f57c00",
                                    }}
                                >
                                    {stats.local}
                                </h3>
                                <p style={{ margin: 0, color: "#666" }}>Local/Other</p>
                            </div>

                            <div
                                style={{
                                    padding: "20px",
                                    backgroundColor: "#f3e5f5",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <h3
                                    style={{
                                        margin: "0 0 10px 0",
                                        fontSize: "36px",
                                        color: "#7b1fa2",
                                    }}
                                >
                                    {stats.cloudinaryPercentage}%
                                </h3>
                                <p style={{ margin: 0, color: "#666" }}>Cloudinary Coverage</p>
                            </div>
                        </div>

                        {nonCloudinaryImages.length > 0 && (
                            <div style={{ marginTop: "40px" }}>
                                <h3 style={{ color: "#f57c00" }}>
                                    Blogs Not Using Cloudinary ({nonCloudinaryImages.length})
                                </h3>
                                <div
                                    style={{
                                        marginTop: "20px",
                                        backgroundColor: "#fff3e0",
                                        borderRadius: "8px",
                                        padding: "20px",
                                    }}
                                >
                                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                        {nonCloudinaryImages.map((img) => (
                                            <li key={img.blogSlug} style={{ marginBottom: "10px" }}>
                                                <strong>{img.blogTitle}</strong>
                                                <br />
                                                <span
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "#666",
                                                        wordBreak: "break-all",
                                                    }}
                                                >
                                                    {img.imageUrl}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "list" && (
                    <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "30px" }}>
                        <h2>All Blog Images</h2>
                        <p style={{ color: "#666" }}>
                            Complete list of all images used across {allImages.length} blog posts
                        </p>

                        <div style={{ marginTop: "30px" }}>
                            {allImages.map((img) => (
                                <div
                                    key={img.blogSlug}
                                    style={{
                                        marginBottom: "20px",
                                        padding: "20px",
                                        backgroundColor: img.isCloudinary ? "#e8f5e9" : "#ffebee",
                                        borderRadius: "8px",
                                        borderLeft: `4px solid ${img.isCloudinary ? "#4caf50" : "#f44336"}`,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "start",
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: "0 0 10px 0" }}>
                                                {img.blogTitle}
                                            </h3>
                                            <p
                                                style={{
                                                    margin: "0 0 10px 0",
                                                    fontSize: "14px",
                                                    color: "#666",
                                                }}
                                            >
                                                Slug: <code>{img.blogSlug}</code>
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0 0 10px 0",
                                                    fontSize: "12px",
                                                    wordBreak: "break-all",
                                                }}
                                            >
                                                <strong>URL:</strong> {img.imageUrl}
                                            </p>
                                            {img.publicId && (
                                                <p style={{ margin: 0, fontSize: "12px" }}>
                                                    <strong>Cloudinary ID:</strong>{" "}
                                                    <code>{img.publicId}</code>
                                                </p>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: "20px",
                                                padding: "5px 15px",
                                                backgroundColor: img.isCloudinary
                                                    ? "#4caf50"
                                                    : "#f44336",
                                                color: "white",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {img.isCloudinary ? "Cloudinary" : "Local"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    // Redirect if not authenticated
    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/admin/blog-images",
                permanent: false,
            },
        };
    }

    // Check for ADMIN role
    if (session.user.role !== "ADMIN") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default BlogImagesAdminPage;
