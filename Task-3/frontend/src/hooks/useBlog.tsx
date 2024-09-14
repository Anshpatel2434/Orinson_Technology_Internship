import { useEffect, useState } from "react";
import axios from "axios";

export type blogType = {
	id: string;
	title: string;
	summary: string;
	content: string;
	createdAt: Date;
};

export const useBlog = ({ id }: { id: string }) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [loading, setLoading] = useState<boolean>(true);
	const [blog, setBlog] = useState<blogType>({
		id: "",
		title: "",
		summary: "",
		content: "",
		createdAt: new Date(),
	});

	useEffect(() => {
		axios.get(`${BACKEND_URL}/api/v1/blog/getBlog/${id}`).then((response) => {
			setBlog(response.data.blog);
			setLoading(false);
		});
	}, []);

	return {
		loading,
		blog,
	};
};
