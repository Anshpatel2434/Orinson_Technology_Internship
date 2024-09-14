import { useEffect, useState } from "react";
import axios from "axios";

export type blogType = {
	id: string;
	title: string;
	summary: string;
	content: string;
	createdAt: Date;
};

export const useBlogs = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [loading, setLoading] = useState<boolean>(true);
	const [blogs, setBlogs] = useState<blogType[]>([]);

	useEffect(() => {
		axios.get(`${BACKEND_URL}/api/v1/blog/allBlogs`).then((response) => {
			setBlogs(response.data.blogs);
			setLoading(false);
		});
	}, []);

	return {
		loading,
		blogs,
	};
};
