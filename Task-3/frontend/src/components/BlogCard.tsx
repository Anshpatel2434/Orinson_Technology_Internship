import React from "react";
import { blogType } from "../hooks/useBlogs";
import { useNavigate } from "react-router-dom";

interface BlogProps {
	blog: blogType;
}

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
	const navigate = useNavigate();

	return (
		<div
			className="bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transition duration-300 hover:shadow-xl hover:bg-gray-750"
			onClick={() => {
				navigate(`/blogDetail/${blog.id}`);
				window.location.reload();
			}}
		>
			<div className="p-6">
				<h2 className="text-xl font-semibold mb-2 truncate text-blue-400">
					{blog.title}
				</h2>
				<p className="text-gray-300 mb-4 line-clamp-2">{blog.summary}</p>
				<div className="text-sm text-gray-400">
					{new Date(blog.createdAt).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
