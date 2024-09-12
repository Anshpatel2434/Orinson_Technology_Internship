import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Feedback = {
	name: String;
	email: String;
	message: String;
};

const FeedbackFrom: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [feedback, setFeedback] = useState<Feedback>({
		name: "",
		email: "",
		message: "",
	});

	async function sendRequest(e: React.FormEvent) {
		e.preventDefault();
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/user/postFeedback`,
			feedback
		);
		console.log(res.data);
		if (res.data.status !== 201) {
			toast.error(res.data.message);
		} else {
			toast.success(res.data.message);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<Toaster />
			<h1 className="text-2xl font-bold text-gray-700 mb-6">
				Feedback from users
			</h1>
			<form
				onSubmit={sendRequest}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full"
			>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name:
					</label>
					<input
						type="text"
						name="username"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={(e) =>
							setFeedback({
								...feedback,
								name: e.target.value,
							})
						}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email:
					</label>
					<input
						type="email"
						name="email"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={(e) =>
							setFeedback({
								...feedback,
								email: e.target.value,
							})
						}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Message:
					</label>
					<textarea
						name="message"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
						onChange={(e) =>
							setFeedback({
								...feedback,
								message: e.target.value,
							})
						}
					/>
				</div>
				<div className="flex items-center justify-between">
					<input
						type="submit"
						value="Submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
					/>
				</div>
			</form>
		</div>
	);
};

export default FeedbackFrom;
