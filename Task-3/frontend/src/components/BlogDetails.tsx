import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BlogDetails: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const { id } = useParams();
	const { blog } = useBlog({ id: id || "" });
	const navigate = useNavigate();

	async function handleDelete() {
		try {
			const res = await axios.delete(
				`${BACKEND_URL}/api/v1/blog/deleteBlog/${id}`
			);
			if (res.data.status !== 200) {
				toast.error(res.data.message);
			} else {
				toast.success("Blog Successfully deleted");
				setTimeout(() => {
					navigate("/blogs");
					window.location.reload();
				}, 1500);
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	}

	if (!blog) {
		return (
			<div className=" h-screen w-screen bg-gray-900 text-gray-100 text-center py-8">
				Blog does not exist
			</div>
		);
	}

	console.log(blog);

	return (
		<div className="bg-gray-900 min-h-screen text-gray-100">
			<div className="max-w-3xl mx-auto px-4 py-8">
				<Toaster />
				<h1 className="text-3xl font-bold mb-6 text-blue-400">{blog.title}</h1>
				<div className="mb-6 text-sm text-gray-400">
					Published on: {new Date(blog.createdAt).toLocaleDateString()}
				</div>
				<div className="prose prose-invert max-w-none mb-8">
					<h2 className="text-xl font-semibold mb-2 text-blue-300">Summary</h2>
					<p className="text-gray-300">{blog.summary}</p>
					<h2 className="text-xl font-semibold mt-6 mb-2 text-blue-300">
						Content
					</h2>
					<p className="text-gray-300">{blog.content}</p>
				</div>
				<div className="flex justify-between">
					<button
						onClick={() => navigate(`/blogForm/${id}`)}
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
					>
						Edit This Blog
					</button>
					<button
						onClick={handleDelete}
						className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
					>
						Delete This Blog
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogDetails;
