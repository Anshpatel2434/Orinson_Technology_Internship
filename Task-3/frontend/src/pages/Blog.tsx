import React from "react";
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";

const Blog: React.FC = () => {
	const { blogs } = useBlogs();
	const navigate = useNavigate();

	return (
		<div className="bg-gray-900 min-h-screen text-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-blue-400">Blogs</h1>
					<button
						onClick={() => navigate(`/blogForm/${"new"}`)}
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
					>
						Post New Blog
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map((blog) => (
						<BlogCard key={blog.id} blog={blog} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Blog;
