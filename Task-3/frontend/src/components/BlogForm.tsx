import React, { useState, useEffect } from "react";
import { blogType } from "../hooks/useBlogs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";

export type blogInputType = {
	title: string;
	summary: string;
	content: string;
};

const BlogForm: React.FC = () => {
	const navigate = useNavigate();
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [newBlog, setNewBlog] = useState<blogInputType>({
		title: "",
		summary: "",
		content: "",
	});
	const { type } = useParams();
	const { blog } = useBlog({ id: type !== "new" ? type || "" : "" });

	useEffect(() => {
		if (type !== "new" && blog) {
			setNewBlog(blog);
		}
	}, [type, blog]);

	async function sendRequest(e: React.FormEvent) {
		e.preventDefault();
		try {
			const url =
				type === "new"
					? `${BACKEND_URL}/api/v1/blog/postBlog`
					: `${BACKEND_URL}/api/v1/blog/updateBlog/${type}`;
			const method = type === "new" ? "post" : "put";
			const res = await axios[method](url, newBlog);

			if (res.data.status !== 200) {
				toast.error(res.data.message);
			} else {
				toast.success(
					type === "new"
						? "Blog successfully posted"
						: "Blog successfully updated"
				);
				setTimeout(() => {
					navigate("/blogs");
					window.location.reload();
				}, 1500);
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	}

	return (
		<div className="bg-gray-900 min-h-screen text-gray-100">
			<div className="max-w-2xl mx-auto px-4 py-8">
				<Toaster />
				<h2 className="text-2xl font-bold mb-6 text-blue-400">
					{type === "new" ? "Create New Blog" : "Edit Blog"}
				</h2>
				<form onSubmit={sendRequest} className="space-y-6">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-300"
						>
							Blog Title
						</label>
						<input
							id="title"
							type="text"
							value={newBlog.title}
							onChange={(e) =>
								setNewBlog({ ...newBlog, title: e.target.value })
							}
							className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="summary"
							className="block text-sm font-medium text-gray-300"
						>
							Blog Summary
						</label>
						<input
							id="summary"
							type="text"
							value={newBlog.summary}
							onChange={(e) =>
								setNewBlog({ ...newBlog, summary: e.target.value })
							}
							className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="content"
							className="block text-sm font-medium text-gray-300"
						>
							Blog Content
						</label>
						<textarea
							id="content"
							value={newBlog.content}
							onChange={(e) =>
								setNewBlog({ ...newBlog, content: e.target.value })
							}
							className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
							rows={6}
							required
						/>
					</div>
					<div>
						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
						>
							{type === "new" ? "Post Blog" : "Update Blog"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BlogForm;
